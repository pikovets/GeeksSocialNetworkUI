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
  margin-bottom: 5%;
}

.form-field {
  padding: 15px 3% 15px 20px;
  background-color: #4e4e4e;
  border-radius: 45px;
  margin-bottom: 2%;
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
}

@media only screen and (min-width: 1366px) {
  .field-input {
    font-size: 14px;
  }
}

@media only screen and (min-width: 1920px) {
  .field-input {
    font-size: 18px;
  }
}
</style>
