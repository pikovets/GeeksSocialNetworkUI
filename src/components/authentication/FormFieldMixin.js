export const FormFieldMixin = {
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
        'valid-field': this.isValid && this.wasSelected && !this.isEmpty,
        'invalid-field': !this.isValid && this.wasSelected && ((this.isEmpty && this.required) || !this.isEmpty),
      };
    },
    isValid() {
      if (this.validationRule === undefined) {
        return true;
      }

      return (
        this.validationRule.test(this.modelValue) && this.backendErrorMsg == ''
      );
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
