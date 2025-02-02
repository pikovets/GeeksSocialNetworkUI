<template>
  <Header />

  <div id="animatedBackground">
    <div class="responsive-container">
      <div class="registration-form">
        <div class="logo-container">
          <img class="logo" src="../assets/img/logo.png" />
        </div>

        <div class="registration-section">
          <p class="title" v-html="$t('createAccountTitle')"></p>
          <p class="log-in-offer">
            {{ $t('alreadyMember') }}
            <router-link to="/login">{{ $t('logIn') }}</router-link>
          </p>

          <FormField
            v-model="userData.fullName"
            :label="$t('fullNameLabel')"
            :validationRule="validationRules.name"
            :validationMsg="$t('nameValidationMsg')"
            :class="{
              'apply-shake': shake.fullName,
            }"
            class="full-name"
          ></FormField>

          <FormField
            v-model="userData.email"
            :label="$t('emailLabel')"
            :backendErrorMsg="backendErrors.email"
            :validationRule="validationRules.email"
            :validationMsg="$t('emailValidationMsg')"
            @clearBackendErrors="clearBackendErrors"
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
            @clearBackendErrors="clearBackendErrors"
            :class="{
              'apply-shake': shake.password,
            }"
            class="password"
          ></PasswordField>
        </div>

        <SuccessMessage v-show="isRegistered" />

        <button class="create-account-btn" @click="onCreateAccountClick">
          {{ $t('createAccountBtn') }}
        </button>
      </div>

      <LoadingScreen v-if="isLoading" />
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import FormField from '../components/fields/FormField.vue';
import PasswordField from '../components/fields/PasswordField.vue';
import LoadingScreen from '../components/LoadingScreen.vue';
import SuccessMessage from '../components/SuccessMessage.vue';

import { validationRules } from '../config/validationRules';
import { errorMessages } from '../config/errorMessages';
import { signup } from '../services/api';

export default {
  components: {
    Header,
    FormField,
    PasswordField,
    LoadingScreen,
    SuccessMessage,
  },
  data() {
    return {
      isOnline: window.navigator.onLine,
      isRegistered: false,
      isLoading: false,
      userData: {
        fullName: '',
        email: '',
        password: '',
      },
      backendErrors: {
        email: '',
        password: '',
      },
      shake: {
        fullName: false,
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
        this.isValidField(this.userData.fullName, 'name') &&
        this.isValidField(this.userData.email, 'email') &&
        this.isValidField(this.userData.password, 'password')
      );
    },
  },
  methods: {
    isValidField(value, fieldName) {
      return value !== '' && this.validationRules[fieldName].test(value);
    },

    clearBackendErrors() {
      this.backendErrors.email = '';
      this.backendErrors.password = '';
      this.isRegistered = false;
    },

    async authenticateUser() {
      try {
        if (!this.isOnline) {
          alert(this.$i18n.t('offlineErrorMsg'));
          return;
        }

        this.interval = setTimeout(() => {
          this.isLoading = true;
        }, 500);

        const response = await signup(this.userData);

        this.isLoading = false;
        clearInterval(this.interval);

        if (response.ok) {
          this.isRegistered = true;
        }
      } catch (error) {
        this.handleAuthenticationError(error);
      }
    },
    handleAuthenticationError(error) {
      this.isLoading = false;
      this.isRegistered = false;
      clearInterval(this.interval);

      if (error.message === errorMessages.TIMEOUT) {
        alert(this.$i18n.t('timeoutErrorMsg'));
        return;
      } else if (error.message === errorMessages.FETCH_FAILED) {
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

      for (let i = 0; i < fieldNames.length; i++) {
        this.backendErrors[fieldNames[i]] = fieldErrorMessages[i];
        this.shakeField(fieldNames[i]);
      }
    },
    onCreateAccountClick() {
      if (this.isFormValid) {
        this.authenticateUser();
      } else {
        const fields = ['fullName', 'email', 'password'];
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

<style scoped src="../assets/styles/SignUp.css"></style>
