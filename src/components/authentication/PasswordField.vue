<template>
  <div class="container">
    <div class="form-field" :class="fieldClasses">
      <input
        :value="modelValue"
        @input="
          $emit('update:modelValue', $event.target.value);
          wasSelected = true;
          $emit('clearBackendError');
        "
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
    <p class="error-msg" v-show="backendError" v-html="backendErrorMsg"></p>
    <p class="error-msg" v-show="!isEmpty && !isValid" v-html="validationMsg"></p>
    <p class="error-msg" v-show="isEmpty && wasSelected">
      {{ $t('emptyFieldMsg') }}
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
    backendError: Boolean,
    backendErrorMsg: String,
  },
  emits: ['update:modelValue', 'clearBackendError'],
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
        'invalid-field':
          (!this.isValid || this.backendError) && this.wasSelected,
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

<style src="../../assets/styles/PasswordField.css"></style>
