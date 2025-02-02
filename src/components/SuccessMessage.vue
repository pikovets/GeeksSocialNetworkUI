<template>
  <div class="success-message-container">
    <p class="message">
      {{ $t('registrationCompleteMsg') }}
      <router-link to="/login">{{ $t('logIn') }}</router-link>
    </p>
  </div>
</template>

<style scoped>
.success-message-container {
  background-color: #48883e81;
  border-radius: 5px;
  margin-bottom: 10%;
}

.message {
  color: #fff;
  font-size: 0.75rem;
  padding: 1em;
}

.message a {
  color: #64b657;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
}
.message a:hover {
  text-decoration: underline;
}
</style>
