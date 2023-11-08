<script>
export default {
  data() {
    return {
      value: '',
    };
  },
  props: {
    validationRule: RegExp,
    label: String,
    validationMsg: String,
  },
  computed: {
    fieldClasses() {
      return {
        'valid-field': this.isValid && !this.isEmpty,
        'invalid-field': !this.isValid && !this.isEmpty,
      };
    },
    isEmpty() {
      return this.value === '';
    },
    isValid() {
      return this.validationRule.test(this.value);
    },
  },
};
</script>

<template>
  <div class="form-field" :class="fieldClasses">
    <input
      v-model="value"
      class="field-input"
      type="text"
      :pattern="validationRule"
      :title="validationMsg"
      required=""
      :placeholder="label"
    />
  </div>
</template>

<style scoped>
.form-field {
  padding: 3% 3% 3% 5%;
  background-color: #4e4e4e;
  border-radius: 45px;
  margin-right: 5%;
  margin-bottom: 5%;
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
