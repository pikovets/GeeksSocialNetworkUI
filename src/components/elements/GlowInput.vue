<script>
export default {
  props: {
    modelValue: String,
    label: String,
    required: {
      type: Boolean,
      default: false,
    },
    validationRule: RegExp,
    validationMsg: String,
    backendErrorMsg: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  emits: ['update:modelValue', 'clearBackendError'],
  data() {
    return {
      wasSelected: false,
      showPassword: false,
    };
  },
  computed: {
    fieldClasses() {
      return {
        'valid-field': this.isValidField,
        'invalid-field': this.isInvalidField,
      };
    },
    isValidField() {
      return (
          this.isValid &&
          this.wasSelected &&
          !this.isEmpty &&
          this.backendErrorMsg === ''
      );
    },
    isInvalidField() {
      return (
          !this.isValid &&
          this.wasSelected &&
          ((this.isEmpty && this.required) || !this.isEmpty)
      );
    },
    isValid() {
      if (!this.validationRule) return true;
      return this.validationRule.test(this.modelValue);
    },
    isEmpty() {
      return !this.modelValue;
    },
    computedInputType() {
      if (this.isPasswordField) {
        return this.showPassword ? 'text' : 'password';
      }
      return this.type;
    },
    isPasswordField() {
      return this.type === 'password';
    },
    passwordIconClass() {
      return this.showPassword ? 'fa-eye-slash' : 'fa-eye';
    },
  },
  methods: {
    updateModelValue(event) {
      this.$emit('update:modelValue', event.target.value);
      this.wasSelected = true;
      this.$emit('clearBackendError');
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<template>
  <div class="glow-input">
    <div class="form-field-wrapper">
      <div class="form-field-container">
        <div class="form-field" :class="fieldClasses">
          <input
              :value="modelValue"
              @input="updateModelValue"
              :type="computedInputType"
              :placeholder="label"
              class="form-field-input"
          />
          <!-- Append Icon for Password Visibility Toggle -->
          <i
              v-if="isPasswordField"
              :class="passwordIconClass"
              @click="togglePasswordVisibility"
              class="form-field-icon fa-solid"
          ></i>
        </div>

        <!-- Error Messages -->
        <p
            v-show="backendErrorMsg !== ''"
            v-html="backendErrorMsg"
            class="form-field-error backend-error"
        ></p>
        <p
            v-show="!isEmpty && !isValid && wasSelected"
            v-html="validationMsg"
            class="form-field-error validation-error"
        ></p>
        <p
            v-show="isEmpty && wasSelected && required"
            class="form-field-error empty-field-error"
        >
          {{ $t('emptyFieldMsg') }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.glow-input {
  .form-field-container {
    display: flex;
    flex-direction: column;
  }

  .form-field {
    display: flex;
    align-items: center;
    padding: 10px 10px 10px 15px;
    background-color: $color-grey-light;
    border-radius: 5px;
    transition: box-shadow 0.3s ease, background-color 0.3s ease;
  }

  .valid-field {
    box-shadow: inset 0 0 15px rgba(0, 128, 0, 0.75);
  }

  .invalid-field {
    box-shadow: inset 0 0 15px rgba(255, 0, 0, 0.65);
  }

  .form-field-input {
    background-color: transparent;
    border: none;
    font-weight: bold;
    color: $color-text-primary;
    font-size: 14px;
    width: 100%;
  }

  .form-field-input::placeholder {
    color: #9e9e9e;
  }

  .form-field-input:focus {
    outline: none;
  }

  .form-field-icon {
    display: inline-block;
    color: #9e9e9e;
    cursor: pointer;
    margin-left: 10px;
    font-size: 15px;
    transition: color 0.3s ease;
  }

  .form-field-icon:hover {
    color: #bfbfbf;
  }

  .form-field-error {
    font-size: 12px;
    color: rgba(255, 0, 0, 0.65);
    margin-top: 5px;
  }
}
</style>
