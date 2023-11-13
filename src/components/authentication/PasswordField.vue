<template>
  <div class="container">
    <div class="form-field" :class="fieldClasses">
      <input
        :value="modelValue"
        @input="
          $emit('update:modelValue', $event.target.value);
          wasSelected = true;
        "
        :type="passwordFieldType"
        class="field-input"
        placeholder="Password"
      />
      <i
        class="fa-solid"
        :class="showPasswordIconClass"
        @click="togglePasswordVisibility"
      ></i>
    </div>
    <p class="error-msg" v-if="!isEmpty && !isValid" v-html="validationMsg"></p>
    <p class="error-msg" v-if="isEmpty && wasSelected">
      This field cannot be empty
    </p>
  </div>
</template>

<script>
import FormField from './FormField.vue';

export default {
  components: {
    FormField,
  },
  props: {
    validationRule: RegExp,
    validationMsg: String,
    modelValue: String,
  },
  emits: ['update:modelValue'],
  data() {
    return {
      wasSelected: false,
      passwordFieldType: 'password',
      showPasswordIconClass: 'fa-eye',
      validationMsg:
        'Secure your password by including:<br>' +
        'One uppercase letter (A-Z)<br>' +
        'One lowercase letter (a-z)<br>' +
        'One digit (0-9)<br>' +
        'Minimum length of 8 characters',
    };
  },
  computed: {
    fieldClasses() {
      return {
        'valid-field': this.isValid && this.wasSelected,
        'invalid-field': !this.isValid && this.wasSelected,
      };
    },
    isEmpty() {
      return this.modelValue === '';
    },
    isValid() {
      return this.validationRule.test(this.modelValue);
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

<style scoped>
.container {
  margin-right: 5%;
  margin-bottom: 5%;
}

.form-field {
  padding: 15px 3% 15px 20px;
  background-color: #4e4e4e;
  border-radius: 45px;

  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2%;
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

.error-msg {
  color: red;
  font-size: 12px;
  padding-left: 10px;
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
