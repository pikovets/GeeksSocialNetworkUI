<template>
  <div class="registration-form">
    <div class="registration-section">
      <p class="subtitle">{{ $t('startForFree') }}</p>
      <p class="title" v-html="$t('createAccountTitle')"></p>
      <p class="log-in-offer">
        {{ $t('alreadyMember') }}
        <router-link to="/login" style="margin-left: 1%">{{
          $t('logIn')
        }}</router-link>
      </p>
      <div>
        <div class="inline-fields">
          <FormField
            v-model="userData.firstName"
            :label="$t('firstNameLabel')"
            :backendErrorMsg="backendErrors.firstName"
            :validationRule="validationRules.firstName"
            :validationMsg="$t('firstNameValidationMsg')"
            :class="{
              'apply-shake': shake.firstName,
            }"
            class="first-name"
          ></FormField>

          <FormField
            v-model="userData.lastName"
            :label="$t('lastNameLabel')"
            :backendErrorMsg="backendErrors.lastName"
            :validationRule="validationRules.lastName"
            :validationMsg="$t('lastNameValidationMsg')"
            :class="{
              'apply-shake': shake.lastName,
            }"
            class="last-name"
          ></FormField>
        </div>

        <FormField
          v-model="userData.email"
          :label="$t('emailLabel')"
          :backendErrorMsg="backendErrors.email"
          :validationRule="validationRules.email"
          :validationMsg="$t('emailValidationMsg')"
          @clearBackendError="clearBackendError('email')"
          :class="{
            'apply-shake': shake.email,
          }"
          class="email"
        ></FormField>

        <PasswordField
          v-model="userData.password"
          :label="$t('passwordLabel')"
          :backendErrorMsg="backendErrors.password"
          :validationRule="validationRules.password"
          :validationMsg="$t('passwordValidationMsg')"
          @clearBackendError="clearBackendError('password')"
          :class="{
            'apply-shake': shake.password,
          }"
          class="password"
        ></PasswordField>
      </div>

      <button class="create-account-btn" @click="onCreateAccountClick">
        {{ $t('createAccountBtn') }}
      </button>
    </div>

    <div class="right-section">
      <div class="background-blur" />
      <img class="g-image" src="../assets/img/G.png" />
    </div>
  </div>

  <LoadingScreen v-if="isLoading" />

  <DialogWindow
    :message="$t('registrationCompleteMsg')"
    :show="isRegistered"
    @close="isRegistered = false"
  />
</template>

<script>
import FormField from '../components/authentication/FormField.vue';
import PasswordField from '../components/authentication/PasswordField.vue';
import LoadingScreen from '../components/LoadingScreen.vue';
import DialogWindow from '../components/DialogWindow.vue';

const ERROR_MESSAGES = {
  TIMEOUT: 'Timeout Error',
  FETCH_FAILED: 'Failed to fetch',
};

import { SIGNUP_API_ENDPOINT } from '@/config/apiConfig';
import { validationRules } from '@/config/validationRules';

export default {
  components: {
    FormField,
    PasswordField,
    LoadingScreen,
    DialogWindow,
  },
  data() {
    return {
      isOnline: window.navigator.onLine,
      isRegistered: false,
      isLoading: false,
      userData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      backendErrors: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      shake: {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
      },
      validationRules: validationRules,
    };
  },
  mounted() {
    if (localStorage.getItem('GeeksJwtToken')) {
      this.$router.push('/');
    }
  },
  computed: {
    isFormValid() {
      return (
        this.isValidField(this.userData.firstName, 'firstName') &&
        this.isValidField(this.userData.lastName, 'lastName') &&
        this.isValidField(this.userData.email, 'email') &&
        this.isValidField(this.userData.password, 'password')
      );
    },
  },
  methods: {
    isValidField(value, fieldName) {
      return value !== '' && this.validationRules[fieldName].test(value);
    },

    clearBackendError(fieldName) {
      this.backendErrors[fieldName] = '';
    },

    async authenticateUser() {
      try {
        if (!this.isOnline) {
          alert(this.$i18n.t('offlineErrorMsg'));
          return;
        }

        this.isLoading = true;

        const response = await Promise.race([
          fetch(SIGNUP_API_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.userData),
          }),
          new Promise((_, reject) => {
            setTimeout(() => {
              reject(new Error(ERROR_MESSAGES.TIMEOUT));
            }, 5000);
          }),
        ]);

        this.isLoading = false;

        if (response.ok) {
          this.isRegistered = true;
        } else {
          const data = await response.json();

          if (data.statusCode === 400) {
            throw new Error(data.message);
          }
        }
      } catch (error) {
        this.handleAuthenticationError(error);
      }
    },
    handleAuthenticationError(error) {
      this.isLoading = false;

      if (error.message === ERROR_MESSAGES.TIMEOUT) {
        alert(this.$i18n.t('timeoutErrorMsg'));
        return;
      } else if (error.message === ERROR_MESSAGES.FETCH_FAILED) {
        alert(this.$i18n.t('serverErrorMsg'));
        return;
      }

      let errorSplit = error.message.split(';');

      let fieldNames = [];
      let fieldErrorMessages = [];

      for (let i = 0; i < errorSplit.length; i++) {
        let keyValueSplit = errorSplit[i].split(':');

        let fieldName = keyValueSplit[0];
        let message = keyValueSplit[1];

        fieldNames.push(fieldName);
        fieldErrorMessages.push(message);
      }

      console.log(error);

      for (let i = 0; i < fieldNames.length; i++) {
        this.backendErrors[fieldNames[i]] = fieldErrorMessages[i];
        this.shakeField(fieldNames[i]);
      }
    },
    onCreateAccountClick() {
      if (this.isFormValid) {
        this.authenticateUser();
      } else {
        const fields = ['firstName', 'lastName', 'email', 'password'];
        for (const fieldName of fields) {
          if (!this.isValidField(this.userData[fieldName], fieldName)) {
            this.shakeField(fieldName);
          }
        }
      }
    },
    shakeField(fieldName) {
      this.shake[fieldName] = true;
      setTimeout(() => {
        this.shake[fieldName] = false;
      }, 820);
    },
  },
};
</script>

<style src="../assets/styles/SignUp.css"></style>
