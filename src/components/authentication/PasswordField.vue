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
  margin-right: 3%;
  margin-bottom: 7.5%;
}

.form-field {
  padding: 0.75em 0.2em 0.75em 1.2em;
  background-color: #4e4e4e;
  border-radius: 45px;
  margin-bottom: 2%;

  display: flex;
  flex-direction: row;
  align-items: center;
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
  font-size: 1rem;
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
  box-shadow: inset 0 0 1rem green;
}

.invalid-field {
  box-shadow: inset 0 0 1rem red;
}

.error-msg {
  color: red;
  font-size: 0.75rem;
  padding-left: 0.5em;
}

@media screen and (min-width: 48em) {
  .form-field {
    padding: 1.5em 1em 1.5em 1.5em;
  }

  .field-input {
    font-size: 1.35rem;
  }

  .fa-solid {
    font-size: 1.35rem;
  }

  .error-msg {
    font-size: 1rem;
  }
}

@media screen and (min-width: 80em) {
  .form-field {
    padding: 1em 1em 1em 1.5em;
  }

  .field-input {
    font-size: 1.1rem;
  }

  .fa-solid {
    display: inline-block;
    font-size: 1rem;
  }

  .error-msg {
    font-size: 0.75rem;
  }
}
</style>
