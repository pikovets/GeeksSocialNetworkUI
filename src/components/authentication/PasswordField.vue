<template>
  <div class="container">
    <div class="form-field" :class="fieldClasses">
      <input
        :value="modelValue"
        @input="updateModelValue"
        :type="passwordFieldType"
        class="field-input"
        :placeholder="$t('passwordLabel')"
      />
      <i
        :class="showPasswordIconClass"
        @click="togglePasswordVisibility"
        class="fa-solid"
      ></i>
    </div>
    <p
      class="error-msg"
      v-show="backendErrorMsg !== ''"
      v-html="backendErrorMsg"
    ></p>
    <p
      class="error-msg"
      v-show="!isEmpty && !isValid"
      v-html="validationMsg"
    ></p>
    <p class="error-msg" v-show="isEmpty && wasSelected">
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
