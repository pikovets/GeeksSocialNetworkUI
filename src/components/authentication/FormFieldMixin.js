export const FormFieldMixin = {
  props: {
    modelValue: String,
    label: String,
    validationRule: RegExp,
    validationMsg: String,
    backendErrorMsg: {
      type: String,
      default: '',
    },
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
        'valid-field':
          this.isValid && this.wasSelected && this.backendErrorMsg == '',
        'invalid-field':
          (!this.isValid || this.backendErrorMsg !== '') && this.wasSelected,
      };
    },
    isValid() {
      return this.validationRule.test(this.modelValue);
    },
    isEmpty() {
      return this.modelValue === '';
    },
  },
  methods: {
    updateModelValue(event) {
      this.$emit('update:modelValue', event.target.value);
      this.wasSelected = true;
      this.$emit('clearBackendErrors');
    },
  },
};
