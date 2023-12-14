<template>
  <Header />

  <div id="animatedBackground">
    <div class="responsive-container">
      <div class="log-in-form">
        <div class="logo-container">
          <img class="logo" src="../assets/img/logo.png" />
        </div>

        <div class="log-in-section">
          <p class="title" v-html="$t('signInTitle')"></p>
          <p class="sign-up-offer">
            {{ $t('noAccountText') }}
            <router-link to="/signup">{{ $t('signUp') }}</router-link>
          </p>

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
            :validationRule="validationRules.password"
            :validationMsg="$t('passwordValidationMsg')"
            @clearBackendErrors="clearBackendErrors"
            :class="{
              'apply-shake': shake.password,
            }"
            class="password"
          ></PasswordField>
        </div>

        <button class="log-in-btn" @click="onLogInClick">
          {{ $t('logInButton') }}
        </button>
      </div>
    </div>
  </div>

  <LoadingScreen v-if="isLoading" />
</template>

<script>
import Header from '../components/Header.vue';
import FormField from '../components/fields/FormField.vue';
import PasswordField from '../components/fields/PasswordField.vue';
import LoadingScreen from '../components/LoadingScreen.vue';

import { validationRules } from '@/config/validationRules';
import { login } from '../services/api';

const ERROR_MESSAGES = {
  TIMEOUT: 'Timeout Error',
  FETCH_FAILED: 'Failed to fetch',
};

export default {
  components: {
    Header,
    FormField,
    PasswordField,
    LoadingScreen,
  },
  data() {
    return {
      isOnline: window.navigator.onLine,
      isLoading: false,
      userData: {
        email: '',
        password: '',
      },
      backendErrors: {
        email: '',
        password: '',
      },
      shake: {
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
        this.isValidField(this.userData.email, 'email') &&
        this.isValidField(this.userData.password, 'password')
      );
    },
  },
  methods: {
    isValidField(value, fieldName) {
      return (
        value !== '' &&
        this.validationRules[fieldName].test(value) &&
        this.backendErrors[fieldName] === ''
      );
    },

    clearBackendErrors() {
      this.backendErrors.email = '';
      this.backendErrors.password = '';
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

        const response = await login(this.userData);
        const data = await response.json();

        this.isLoading = false;
        clearInterval(this.interval);

        const jwtToken = data.token;
        localStorage.setItem('GeeksJwtToken', jwtToken);

        this.$router.push('/');
      } catch (error) {
        this.handleAuthenticationError(error);
      }
    },
    handleAuthenticationError(error) {
      this.isLoading = false;
      clearInterval(this.interval);

      if (error.message === ERROR_MESSAGES.TIMEOUT) {
        alert(this.$i18n.t('timeoutErrorMsg'));
      } else if (error.message === ERROR_MESSAGES.FETCH_FAILED) {
        alert(this.$i18n.t('serverErrorMsg'));
      } else if (error.message === 'Incorrect username or password') {
        this.backendErrors.email = error.message;
        this.shakeField('email');

        this.backendErrors.password = error.message;
        this.shakeField('password');
      }
    },
    onLogInClick() {
      if (this.isFormValid) {
        this.authenticateUser();
      } else {
        const fields = ['email', 'password'];
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

<style scoped src="../assets/styles/LogIn.css"></style>
