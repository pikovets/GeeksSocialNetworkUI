<script>
import GlowInput from '../components/elements/GlowInput.vue';
import Header from '../components/Header.vue';
import LoadingScreen from '../components/LoadingScreen.vue';
import SuccessMessage from '../components/SuccessMessage.vue';

import { errorMessages } from '../config/errorMessages';
import { validationRules } from '../config/validationRules';
import { signup } from '../services/api';

export default {
  components: {
    Header,
    GlowInput,
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
  methods: {
    isValidField(value, fieldName) {
      return value !== '' && this.validationRules[fieldName].test(value);
    },
    isFormValid() {
      return (
        this.isValidField(this.userData.fullName, 'name') &&
        this.isValidField(this.userData.email, 'email') &&
        this.isValidField(this.userData.password, 'password')
      );
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

        this.isLoading = true;
        const response = await signup(this.userData);
        this.isLoading = false;

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

      if (error.message === errorMessages.TIMEOUT) {
        alert(this.$i18n.t('timeoutErrorMsg'));
        return;
      } else if (error.message === errorMessages.FETCH_FAILED) {
        alert(this.$i18n.t('serverErrorMsg'));
        return;
      }

      let errorDetails = error.message.split(';');
      errorDetails.forEach((error) => {
        let [fieldName, message] = error.split(':');
        this.backendErrors[fieldName] = message;
        this.shakeField(fieldName);
      });
    },
    onCreateAccountClick() {
      if (this.isFormValid()) {
        this.authenticateUser();
      } else {
        ['fullName', 'email', 'password'].forEach((field) => {
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
      <div class="registration-form">
        <div class="logo-container">
          <img class="logo" src="../assets/img/logo.png" />
        </div>

        <div class="registration-section">
          <p class="title">{{ $t('createAccountTitle') }}</p>
          <p class="log-in-offer">
            {{ $t('alreadyMember') }}
            <router-link to="/login">{{ $t('logIn') }}</router-link>
          </p>

          <GlowInput
            v-model="userData.fullName"
            :label="$t('fullNameLabel')"
            :validationRule="validationRules.name"
            :validationMsg="$t('nameValidationMsg')"
            :class="{ 'apply-shake': shake.fullName }"
            class="full-name"
          />

          <GlowInput
            v-model="userData.email"
            :label="$t('emailLabel')"
            :backendErrorMsg="backendErrors.email"
            :validationRule="validationRules.email"
            :validationMsg="$t('emailValidationMsg')"
            @clearBackendError="clearBackendErrors"
            :class="{ 'apply-shake': shake.email }"
            class="email"
          />

          <GlowInput
            v-model="userData.password"
            :label="$t('passwordLabel')"
            :backendErrorMsg="backendErrors.password"
            :validationRule="validationRules.password"
            :validationMsg="$t('passwordValidationMsg')"
            :type="'password'"
            @clearBackendError="clearBackendErrors"
            :class="{ 'apply-shake': shake.password }"
            class="password"
          />
        </div>

        <SuccessMessage v-show="isRegistered" />

        <button class="create-account-btn" @click="onCreateAccountClick">
          {{ $t('createAccountBtn') }}
        </button>

        <LoadingScreen v-if="isLoading" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.registration-form {
  @include form-mixin;
}

.responsive-container {
  align-items: center;
}

.logo-container {
  display: flex;
  justify-content: center;
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

.log-in-offer {
  color: $color-text-muted;
  margin-bottom: 40px;
  text-align: center;
  font-size: 14px;
}

.log-in-offer a {
  color: $color-secondary;
  font-weight: 800;
  cursor: pointer;
  text-decoration: none;
}

.log-in-offer a:hover {
  text-decoration: underline;
}

.create-account-btn {
  @include button-mixin($color-primary);
}

.password {
  margin-bottom: 20px;
}
</style>