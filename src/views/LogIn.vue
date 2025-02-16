<script>
import Header from '../components/Header.vue';
import LoadingScreen from '../components/LoadingScreen.vue';
import GlowInput from '../components/elements/GlowInput.vue';

import { errorMessages } from '../config/errorMessages';
import { validationRules } from '../config/validationRules';
import { login } from '../services/api';

export default {
  components: {
    Header,
    LoadingScreen,
    GlowInput,
  },
  data() {
    return {
      isOnline: navigator.onLine,
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
      validationRules,
    };
  },
  mounted() {
    if (localStorage.getItem('GeeksJwtToken')) {
      this.$router.push('/');
    }
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  },
  beforeUnmount() {
    window.removeEventListener('online', this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
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
    updateOnlineStatus() {
      this.isOnline = navigator.onLine;
    },
    isValidField(value, fieldName) {
      return (
        value !== '' &&
        this.validationRules[fieldName]?.test(value) &&
        !this.backendErrors[fieldName]
      );
    },
    clearBackendErrors() {
      this.backendErrors.email = '';
      this.backendErrors.password = '';
    },
    async authenticateUser() {
      if (!this.isOnline) {
        alert(this.$t('offlineErrorMsg'));
        return;
      }

      this.isLoading = true;
      try {
        const response = await login(this.userData);
        if (!response.ok) throw new Error(await response.text());
        
        const data = await response.json();
        localStorage.setItem('GeeksJwtToken', data.token);
        this.$router.push('/');
      } catch (error) {
        this.handleAuthenticationError(error);
      } finally {
        this.isLoading = false;
      }
    },
    handleAuthenticationError(error) {
      if (error.message === errorMessages.TIMEOUT) {
        alert(this.$t('timeoutErrorMsg'));
      } else if (error.message === errorMessages.FETCH_FAILED) {
        alert(this.$t('serverErrorMsg'));
      } else if (error.message.includes('Incorrect')) {
        this.backendErrors.email = error.message;
        this.backendErrors.password = error.message;
        this.shakeField('email');
        this.shakeField('password');
      }
    },
    onLogInClick() {
      if (this.isFormValid) {
        this.authenticateUser();
      } else {
        ['email', 'password'].forEach((field) => {
          if (!this.isValidField(this.userData[field], field)) {
            this.shakeField(field);
          }
        });
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

<template>
  <Header />

  <div id="animatedBackground">
    <div class="responsive-container">
      <div class="log-in-form">
        <div class="logo-container">
          <img class="logo" src="@/assets/img/logo.png" />
        </div>

        <div class="log-in-section">
          <p class="title" v-html="$t('signInTitle')"></p>
          <p class="sign-up-offer">
            {{ $t('noAccountText') }}
            <router-link to="/signup">{{ $t('signUp') }}</router-link>
          </p>

          <GlowInput
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
          ></GlowInput>

          <GlowInput
            v-model="userData.password"
            :label="$t('passwordLabel')"
            :validationRule="validationRules.password"
            :validationMsg="$t('passwordValidationMsg')"
            @clearBackendErrors="clearBackendErrors"
            :type="'password'"
            :class="{
              'apply-shake': shake.password,
            }"
            class="password"
          ></GlowInput>
        </div>

        <button class="log-in-btn" @click="onLogInClick">
          {{ $t('logInButton') }}
        </button>
      </div>
    </div>
  </div>

  <LoadingScreen v-if="isLoading" />
</template>

<style scoped lang="scss">
.log-in-form {
  @include form-mixin;
}

.responsive-container {
  align-items: center;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 25px;
  margin-bottom: 25px;
}

.logo {
  width: 50px;
  height: 50px;
}

.title {
  color: white;
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
}

.sign-up-offer {
  color: #a0a0a0;
  margin-bottom: 40px;
  align-self: center;
  font-size: 14px;
  text-align: center;
}

.sign-up-offer a {
  color: $color-secondary;
  font-weight: 800;
  cursor: pointer;
  text-decoration: none;
}
.sign-up-offer a:hover {
  text-decoration: underline;
}

.email,
.password {
  width: 100%;
}

.password {
  margin-bottom: 65px;
}

.log-in-btn {
  @include button-mixin($color-primary);
}
</style>
