<template>
  <div class="container">
    <div class="form-field" :class="fieldClasses">
      <input
        :value="modelValue"
        @input="updateModelValue"
        :type="passwordFieldType"
        :placeholder="label"
        class="field-input"
      />
      <i
        :class="showPasswordIconClass"
        @click="togglePasswordVisibility"
        class="fa-solid"
      ></i>
    </div>
    <p
      id="backend-error-msg"
      v-show="backendErrorMsg !== ''"
      v-html="backendErrorMsg"
      class="error-msg"
    ></p>
    <p
      id="validation-error-msg"
      class="error-msg"
      v-show="!isEmpty && !isValid && wasSelected"
      v-html="validationMsg"
    ></p>
    <p
      id="empty-field-error-msg"
      class="error-msg"
      v-show="isEmpty && wasSelected && required"
    >
      {{ $t('emptyFieldMsg') }}
    </p>
  </div>
</template>

<script>
import { FormFieldMixin } from './FormFieldMixin';

export default {
  mixins: [FormFieldMixin],
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

<style src="../../assets/styles/PasswordField.css"></style>
