<template>
  <div class="section">
    <FormField
      v-model="userData.email"
      :required="true"
      :label="$t('emailLabel')"
      :backendErrorMsg="backendErrors.email"
      :validationRule="validationRules.email"
      :validationMsg="$t('emailValidationMsg')"
    ></FormField>

    <PasswordField
      v-model="userData.oldPassword"
      :label="$t('oldPasswordLabel')"
      :backendErrorMsg="backendErrors.oldPassword"
      :validationRule="validationRules.password"
      :validationMsg="$t('passwordValidationMsg')"
    ></PasswordField>

    <PasswordField
      v-model="userData.newPassword"
      :label="$t('newPasswordLabel')"
      :validationRule="validationRules.password"
      :validationMsg="$t('passwordValidationMsg')"
      :required="oldPasswordIsValid"
      :class="{
        passive: !oldPasswordIsValid,
      }"
    ></PasswordField>
  </div>
</template>

<script>
import FormField from '../fields/FormField.vue';
import PasswordField from '../fields/PasswordField.vue';

import { validationRules } from '@/config/validationRules';

export default {
  props: {
    userData: {
      type: Object,
      required: true,
    },
    backendErrors: {
      type: Object,
      required: true,
    },
  },
  components: {
    FormField,
    PasswordField,
  },
  data() {
    return {
      validationRules: validationRules,
    };
  },
  computed: {
    oldPasswordIsValid() {
      return this.userData.oldPassword !== '' && this.validationRules.password.test(this.userData.oldPassword);
    },
  },
};
</script>

<style scoped>
.passive {
  pointer-events: none;
  opacity: 0.5;
}
</style>
