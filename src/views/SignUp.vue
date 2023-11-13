<template>
  <LoadingScreen v-if="isLoading" />

  <div class="registration-form">
    <div class="left-section">
      <p class="start-for-free-text">Start for free</p>
      <p class="title">
        Create <br />
        your account
      </p>
      <p class="log-in-offer">
        Already a member? <span style="margin-left: 1%">Log in</span>
      </p>
      <div>
        <div class="inline-fields">
          <FormField
            :validationRule="validationRules.firstName"
            validationMsg="Enter only letters (A-Z, a-z), spaces, apostrophes"
            v-model="userData.firstName"
            label="First name"
            class="first-name"
            :class="{
              'apply-shake': shake.firstName,
            }"
          ></FormField>

          <FormField
            :validationRule="validationRules.lastName"
            validationMsg="Enter only letters (A-Z, a-z), spaces, apostrophes"
            v-model="userData.lastName"
            label="Last name"
            class="last-name"
            :class="{
              'apply-shake': shake.lastName,
            }"
          ></FormField>
        </div>

        <FormField
          :backendError="backendErrors.email.backendError"
          :backendErrorMsg="backendErrors.email.backendErrorMsg"
          :validationRule="validationRules.email"
          validationMsg='Ensure your email is valid by following these criteria:<br>End with "@gmail.com"<br>Include only letters (a-z, A-Z), digits (0-9), and the special characters ".", "_", "%", "+", or "-"'
          v-model="userData.email"
          label="Email"
          class="email"
          :class="{
            'apply-shake': shake.email,
          }"
        ></FormField>

        <PasswordField
          :validationRule="validationRules.password"
          v-model="userData.password"
          class="password"
          :class="{
            'apply-shake': shake.password,
          }"
        ></PasswordField>
      </div>

      <button class="create-account-btn" @click="onCreateAccountClick">
        Create account
      </button>
    </div>

    <div class="right-section">
      <div class="background-blur" />
      <img class="g-image" src="../assets/img/G.png" />
    </div>
  </div>
</template>

<script>
import LoadingScreen from '../components/LoadingScreen.vue';
import FormField from '../components/authentication/FormField.vue';
import PasswordField from '../components/authentication/PasswordField.vue';

export default {
  components: {
    FormField,
    PasswordField,
    LoadingScreen,
  },
  data() {
    return {
      isOnline: window.navigator.onLine,
      passwordFieldType: 'password',
      showPasswordIconClass: 'fa-eye',
      isLoading: false,
      shake: false,
      userData: {
        firstName: '',
        lastName: '',
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

    authenticateUser() {
      if (!this.isOnline) {
        alert('Please check your internet connection and try again.');
        return;
      }

      this.isLoading = true;

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('The request timed out. Please try again.'));
        }, 5000);
      });

      Promise.race([
        fetch('http://localhost:3000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.userData),
        }),
        timeoutPromise,
      ])
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.isLoading = false;

          if (data.statusCode !== 201) {
            throw new Error(data.message);
          }
        })
        .catch((error) => {
          this.isLoading = false;
          if (error.message === 'Timeout Error') {
            alert('The request timed out. Please try again.');
            return;
          } else if (error.message === 'Failed to fetch') {
            alert(
              'An error occurred while communicating with the server. Please try again later.'
            );
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
            this.backendErrors[fieldNames[i]].backendErrorMsg =
              fieldErrorMessages[i];
            this.backendErrors[fieldNames[i]].backendError = true;
            this.shakeField(fieldNames[i]);
          }
        });
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

<style scoped>
.registration-form {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #343534;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

.left-section {
  width: 100%;
  height: 100%;
  padding-top: 20vh;
  padding-left: 10%;
}

.start-for-free-text {
  color: #646464;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 3%;
}

.title {
  color: white;
  font-size: 40px;
  width: 80%;
  margin-bottom: 1.5%;
}

.log-in-offer {
  color: #a0a0a0;
  margin-bottom: 11%;
}

.log-in-offer span {
  color: #64b657;
  font-weight: 800;
  cursor: pointer;
}
.log-in-offer span:hover {
  text-decoration: underline;
}

.inline-fields {
  display: flex;
}

.first-name,
.last-name {
  width: 41%;
}

.email,
.password {
  width: 85%;
}

.error-msg {
  font-size: 12px;
  color: #cc3300;
}

.create-account-btn {
  background-color: #48883e;
  border: none;
  border-radius: 45px;
  color: white;
  font-weight: bold;
  font-size: 14px;
  padding: 10px 15px;
  transition: background-color 0.1s, transform 0.1s, opacity 0.1s;
  transform-origin: center;
}
.create-account-btn:hover {
  opacity: 0.8;
  transform: scale(1.025);
}
.create-account-btn:active {
  opacity: 1;
  transform: scale(0.95);
}

.disabled-create-account-btn {
  background-color: gray;
  border: none;
  border-radius: 45px;
  color: white;
  font-weight: bold;
  font-size: 14px;
  padding: 10px 15px;
  transition: background-color 0.1s, transform 0.1s, opacity 0.1s;
  transform-origin: center;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.apply-shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

.right-section {
  width: 0%;
  height: 100%;
}

.background-blur {
  background-color: #48883e;
  width: 60%;
  height: 60%;
  filter: blur(100px);
  position: relative;
  top: 25%;
  left: 25%;
}

.g-image {
  max-width: 65%;
  height: auto;
  object-fit: cover;
  position: relative;
  top: -40%;
  left: 20%;
  display: none;
}

@media only screen and (min-width: 600px) {
  .registration-form {
    width: 100%;
    height: 100%;
    border-radius: 0px;
  }

  .left-section {
    width: 100%;
  }

  .start-for-free-text {
    font-size: 20px;
  }

  .title {
    font-size: 44px;
  }

  .log-in-offer {
    font-size: 20px;
  }

  .create-account-btn {
    font-size: 24px;
    padding: 2% 5% 2% 5%;
  }

  .right-section {
    width: 0%;
  }

  .g-image {
    display: none;
  }
}

@media only screen and (min-width: 1024px) {
  .registration-form {
    width: 100%;
    height: 100%;
    border-radius: 0px;
  }

  .left-section {
    width: 45%;
    padding-left: 5%;
  }

  .right-section {
    width: 55%;
  }

  .title {
    font-size: 40px;
  }

  .create-account-btn {
    padding: 15px;
  }

  .right-section {
    width: 60%;
  }

  .g-image {
    display: block;
    left: 20%;
    top: -30%;
    height: auto;
  }
}

@media only screen and (min-width: 1366px) {
  .registration-form {
    width: 70%;
    height: 60vh;
    border-radius: 25px;
  }

  .left-section {
    padding-top: 4vh;
  }

  .start-for-free-text {
    font-size: 14px;
  }

  .title {
    font-size: 32px;
  }

  .log-in-offer {
    font-size: 14px;
  }

  .create-account-btn {
    font-size: 14px;
    padding: 2.5% 4.5% 2.5% 4.5%;
  }

  .g-image {
    top: -40%;
  }
}

@media only screen and (min-width: 1920px) {
  .registration-form {
    width: 75%;
    height: 90vh;
  }

  .start-for-free-text {
    font-size: 16px;
  }

  .title {
    font-size: 45px;
  }

  .log-in-offer {
    font-size: 18px;
  }

  .create-account-btn {
    font-size: 18px;
  }

  .disabled-create-account-btn {
    font-size: 18px;
  }
}

@media screen and (min-width: 2560px) {
  .registration-form {
    width: 40%;
    height: 65vh;
  }
}
</style>
