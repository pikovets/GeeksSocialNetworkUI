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
      {{ $t('emptyFieldMsg') }}
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
  emits: ['update:modelValue', 'clearBackendError'],
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

<style src="../../assets/styles/FormField.css"></style>
