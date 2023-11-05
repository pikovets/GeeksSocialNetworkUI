<template>
  <div class="login-form">
    <div class="left-section">
      <p class="start-for-free-text">Start for free</p>
      <p class="title">
        Log in<br />
        to your account
      </p>
      <p class="log-in-offer">
        Not a member yet? <span style="margin-left: 1%">Register</span>
      </p>
      <div class="email-box">
        <input class="field-input" type="text" placeholder="Email"/>
      </div>
      <div class="password-box">
        <input class="field-input" type="password" placeholder="Password"/>
      </div>
      <button class="create-account-btn">Log in</button>
    </div>
    <div class="right-section">
      <div class="background-blur" />
      <img class="g-image" src="../assets/img/G.png" />
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: #96c291;
}

.login-form {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #343534;
  width: 60%;
  height: 75%;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
}

.left-section {
  width: 40%;
  height: 100%;
  padding: 95px 0px 0px 60px;
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
  width: 325px;
  margin-bottom: 10px;
}

.log-in-offer {
  color: #a0a0a0;
  margin-bottom: 35px;
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

.email-box,
.password-box {
  width: 85%;
  padding: 3% 3% 3% 5%;
  background-color: #4e4e4e;
  border-radius: 45px;
  margin-bottom: 5%;
}

.password-box {
  margin-bottom: 10%;
}

.create-account-btn {
  background-color: #48883e;
  border: none;
  border-radius: 45px;
  width: 35%;
  height: 7.5%;
  color: white;
  font-weight: bold;
  font-size: 14px;
  transition: opacity 0.25s;
}
.create-account-btn:hover {
  opacity: 0.8;
}

.create-account-btn:active {
  opacity: 1;
  width: 34.5%;
  height: 7%;
  font-size: 13px;
}

.right-section {
  width: 60%;
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
  width: 65%;
  height: 65%;
  object-fit: cover;
  position: relative;
  top: -40%;
  left: 20%;
}
</style>
