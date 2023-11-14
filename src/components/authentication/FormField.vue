<template>
  <div class="container">
    <div class="form-field" :class="fieldClasses">
      <input
        :value="modelValue"
        @input="
          $emit('update:modelValue', $event.target.value);
          wasSelected = true;
          backendError = false;
        "
        class="field-input"
        type="text"
        :pattern="validationRul"
        :title="validationMsg"
        required=""
        :placeholder="label"
      />
    </div>
    <p class="error-msg" v-show="backendError" v-html="backendErrorMsg"></p>
    <p
      class="error-msg"
      v-show="!isEmpty && !isValid"
      v-html="validationMsg"
    ></p>
    <p class="error-msg" v-show="isEmpty && wasSelected">
      This field cannot be empty
    </p>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    label: String,
    validationRule: RegExp,
    validationMsg: String,
    backendError: Boolean,
    backendErrorMsg: String,
  },
  emits: ['update:modelValue'],
  data() {
    return {
      wasSelected: false,
    };
  },
  computed: {
    fieldClasses() {
      return {
        'valid-field': this.isValid && this.wasSelected,
        'invalid-field':
          (!this.isValid || this.backendError) && this.wasSelected,
      };
    },
    isValid() {
      return this.validationRule.test(this.modelValue);
    },
    isEmpty() {
      return this.modelValue === '';
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
