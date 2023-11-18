<template>
  <div class="registration-form">
    <div class="registration-section">
      <p class="subtitle">{{ $t('haveFunText') }}</p>
      <p class="title" v-html="$t('logInTitle')"></p>
      <p class="sign-up-offer">
        {{ $t('noAccountText') }}
        <router-link to="/signup" style="margin-left: 1%">{{
          $t('signUp')
        }}</router-link>
      </p>
      <div>
        <FormField
          :backendError="backendErrors.email.backendError"
          :backendErrorMsg="backendErrors.email.backendErrorMsg"
          :validationRule="validationRules.email"
          :validationMsg="$t('emailValidationMsg')"
          :label="$t('emailLabel')"
          v-model="userData.email"
          @clearBackendError="backendErrors.email.backendError = false"
          :class="{
            'apply-shake': shake.email,
          }"
          class="email"
        ></FormField>

        <PasswordField
          :backendError="backendErrors.password.backendError"
          :backendErrorMsg="backendErrors.password.backendErrorMsg"
          :validationRule="validationRules.password"
          :validationMsg="$t('passwordValidationMsg')"
          :label="$t('passwordLabel')"
          @clearBackendError="backendErrors.password.backendError = false"
          v-model="userData.password"
          :class="{
            'apply-shake': shake.password,
          }"
          class="password"
        ></PasswordField>
      </div>

      <button class="log-in-btn" @click="authenticateUser">
        {{ $t('logInButton') }}
      </button>
    </div>

    <div class="right-section">
      <div class="background-blur" />
      <img class="g-image" src="../assets/img/G.png" />
    </div>
  </div>

  <LoadingScreen v-if="isLoading" />
</template>

<script>
import FormField from '../components/authentication/FormField.vue';
import PasswordField from '../components/authentication/PasswordField.vue';
import LoadingScreen from '../components/LoadingScreen.vue';
import DialogWindow from '../components/DialogWindow.vue';

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
      passwordFieldType: 'password',
      showPasswordIconClass: 'fa-eye',
      isLoading: false,
      shake: false,
      userData: {
        email: '',
        password: '',
      },
      validationRules: {
        firstName: /^[A-Za-z' ]+$/,
        lastName: /^[A-Za-z' ]+$/,
        email: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
      },
      backendErrors: {
        email: {
          backendErrorMsg: '',
          backendError: false,
        },
        password: {
          backendErrorMsg: '',
          backendError: false,
        },
      },
      shake: {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
      },
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
      return value !== '' && this.validationRules[fieldName].test(value);
    },

    async authenticateUser() {
      try {
        if (!this.isOnline) {
          alert(this.$i18n.t('offlineErrorMsg'));
          return;
        }

        this.isLoading = true;

        const response = await Promise.race([
          fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.userData),
          }),
          new Promise((_, reject) => {
            setTimeout(() => {
              reject(new Error('Timeout Error'));
            }, 5000);
          }),
        ]);

        this.isLoading = false;

        if (response.ok) {
          const data = await response.json();
          const jwtToken = data.token;

          localStorage.setItem('GeeksJwtToken', jwtToken);
          console.log(jwtToken);

          this.isEntered = true;
        } else {
          const data = await response.json();

          if (data.statusCode === 400) {
            throw new Error(data.message);
          }
        }
      } catch (error) {
        this.backendErrors.email.backendError = true;
        this.backendErrors.email.backendErrorMsg = error.message;

        this.backendErrors.password.backendError = true;
        this.backendErrors.password.backendErrorMsg = error.message;
      }
    },
  },
};
</script>

<style src="../assets/styles/LogIn.css"></style>
