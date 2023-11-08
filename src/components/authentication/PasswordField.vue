<script>
import FormField from './FormField.vue';

export default {
  components: {
    FormField,
  },
  data() {
    return {
      passwordFieldType: 'password',
      showPasswordIconClass: 'fa-eye',
      value: '',
      validationRule: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
    };
  },
  computed: {
    fieldClasses() {
      return {
        'valid-field': this.isValid && !this.isEmpty,
        'invalid-field': !this.isValid && !this.isEmpty,
      };
    },
    isEmpty() {
      return this.value === '';
    },
    isValid() {
      return this.validationRule.test(this.value);
    },
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
  <div class="form-field" :class="fieldClasses">
    <input
      v-model="value"
      class="field-input"
      :type="passwordFieldType"
      pattern="/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/"
      title="For your account's security, please enter a valid password that meets these criteria:
      At least one uppercase letter (A-Z)
      At least one lowercase letter (a-z)
      At least one digit (0-9)
      Must be a minimum of 8 characters in length"
      required=""
      placeholder="Password"
    />
    <i  
      class="fa-solid"
      :class="showPasswordIconClass"
      @click="togglePasswordVisibility"
    ></i>
  </div>
</template>

<style scoped>
.form-field {
  padding: 3% 3% 3% 5%;
  background-color: #4e4e4e;
  border-radius: 45px;
  margin-right: 5%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10%;
}
.form-field,
input {
  padding-right: 10px;
}

.field-input {
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

.fa-solid {
  display: inline-block;
  margin-right: 3.5%;
  color: #9e9e9e;
  cursor: pointer;
}

.valid-field {
  box-shadow: inset 0 0 15px green;
}

.invalid-field {
  box-shadow: inset 0 0 15px red;
}

@media only screen and (min-width: 600px) {
  .field-input {
    font-size: 20px;
  }

  .fa-solid {
    transform: scale(1.5, 1.5);
    margin-right: 3.5%;
  }
}

@media only screen and (min-width: 1366px) {
  .field-input {
    font-size: 14px;
  }

  .fa-solid {
    transform: scale(1, 1);
  }
}

@media only screen and (min-width: 1920px) {
  .field-input {
    font-size: 18px;
  }

  .fa-solid {
    transform: scale(1, 1);
  }
}
</style>
