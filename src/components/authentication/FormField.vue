<template>
  <div class="container">
    <div :class="['form-field', fieldClasses]">
      <input
        :value="modelValue"
        @input="updateModelValue"
        :pattern="validationRule"
        :placeholder="label"
        type="text"
        class="field-input"
      />
    </div>
    <p
      v-show="backendErrorMsg !== ''"
      v-html="backendErrorMsg"
      class="error-msg"
    ></p>
    <p
      v-show="!isEmpty && !isValid"
      v-html="validationMsg"
      class="error-msg"
    ></p>
    <p v-show="isEmpty && wasSelected" class="error-msg">
      {{ $t('emptyFieldMsg') }}
    </p>
  </div>
</template>

<script>
import { FormFieldMixin } from './FormFieldMixin';

export default {
  mixins: [FormFieldMixin],
};
</script>

<style src="../../assets/styles/FormField.css"></style>
