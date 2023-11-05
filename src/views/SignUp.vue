<script>
export default {
  data() {
    return {
      passwordFieldType: 'password',
      showPasswordIconClass: 'fa-eye',
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === 'password' ? 'text' : 'password';
      this.showPasswordIconClass =
        this.passwordFieldType === 'password' ? 'fa-eye' : 'fa-eye-slash';
    },
  },
};
</script>

<template>
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
      <div class="names-box">
        <div class="first-name-box">
          <input
            id="first-name"
            class="field-input"
            type="text"
            placeholder="First name"
          />
        </div>
        <div class="last-name-box">
          <input
            id="second-name"
            class="field-input"
            type="text"
            placeholder="Last name"
          />
        </div>
      </div>
      <div class="email-box">
        <input class="field-input" type="text" placeholder="Email" />
      </div>
      <div class="password-box">
        <input
          class="field-input"
          :type="passwordFieldType"
          placeholder="Password"
        />
        <i
          id="show-password-icon"
          class="fa-solid"
          :class="showPasswordIconClass"
          @click="togglePasswordVisibility"
        ></i>
      </div>
      <button class="create-account-btn">Create account</button>
    </div>
    <div class="right-section">
      <div class="background-blur" />
      <img class="g-image" src="../assets/img/G.png" />
    </div>
  </div>
</template>

<style scoped>
.registration-form {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #343534;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
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

.first-name-box,
.last-name-box {
  width: 40%;
  padding: 3% 3% 3% 5%;
  background-color: #4e4e4e;
  border-radius: 45px;
  margin-right: 5%;
  display: inline-block;
  margin-bottom: 5%;
}

.field-input {
  display: inline-block;
  background-color: rgba(0, 0, 0, 0);
  border-style: none;
  font-weight: bold;
  color: whitesmoke;
  font-size: 14px;
  width: 100%;
}
.field-input::placeholder {
  color: #9e9e9e;
}
.password-box,
input {
  padding-right: 10px;
}

.email-box,
.password-box {
  width: 85%;
  padding: 3% 3% 3% 5%;
  background-color: #4e4e4e;
  border-radius: 45px;
  margin-bottom: 5%;
}

.password-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10%;
}

#show-password-icon {
  display: inline-block;
  margin-right: 7.5px;
  color: #9e9e9e;
  cursor: pointer;
}

.create-account-btn {
  background-color: #48883e;
  border: none;
  border-radius: 45px;
  color: white;
  font-weight: bold;
  font-size: 14px;
  padding: 10px 15px;
  transition: background-color 0.15s, transform 0.15s, opacity 0.15s;
  transform-origin: center;
}
.create-account-btn:hover {
  opacity: 0.8;
  transform: scale(1.05);
}
.create-account-btn:active {
  opacity: 1;
  transform: scale(0.95);
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

.valid-field {
  box-shadow: inset 0 0 15px green;
}

.invalid-field {
  box-shadow: inset 0 0 15px red;
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

  .field-input {
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
    height: 75vh;
    border-radius: 25px;
  }

  .left-section {
    padding-top: 7.5vh;
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

  .field-input {
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
    width: 60%;
    height: 70%;
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

  .field-input {
    font-size: 18px;
  }

  .create-account-btn {
    font-size: 18px;
  }
}

@media screen and (min-width: 2560px) {
  .registration-form {
    width: 40%;
    height: 85%;
  }
}
</style>
