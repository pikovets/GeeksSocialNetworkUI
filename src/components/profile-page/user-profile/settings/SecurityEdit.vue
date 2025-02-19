<script>
import GlowInput from '@/components/elements/GlowInput.vue';

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
    GlowInput,
  },
  data() {
    return {
      validationRules: validationRules,
    };
  },
  computed: {
    oldPasswordIsValid() {
      return (
          this.userData.oldPassword !== '' &&
          this.validationRules.password.test(this.userData.oldPassword)
      );
    },
  },
};
</script>

<template>
  <div class="section">
    <GlowInput
      v-model="userData.email"
      :required="true"
      :label="$t('emailLabel')"
      @clearBackendErrors="backendErrors.email = ''"
      :backendErrorMsg="backendErrors.email"
      :validationRule="validationRules.email"
      :validationMsg="$t('emailValidationMsg')"
    ></GlowInput>

    <GlowInput
      v-model="userData.oldPassword"
      :label="$t('oldPasswordLabel')"
      @clearBackendErrors="backendErrors.oldPassword = ''"
      :backendErrorMsg="backendErrors.oldPassword"
      :validationRule="validationRules.password"
      :type="'password'"
      :validationMsg="$t('passwordValidationMsg')"
    ></GlowInput>

    <GlowInput
      v-model="userData.newPassword"
      :label="$t('newPasswordLabel')"
      :validationRule="validationRules.password"
      :validationMsg="$t('passwordValidationMsg')"
      :required="oldPasswordIsValid"
      :type="'password'"
      :class="{
        passive: !oldPasswordIsValid,
      }"
    ></GlowInput>
  </div>
</template>

<style scoped>
.passive {
  pointer-events: none;
  opacity: 0.5;
}

.section div {
  margin-bottom: 10px;
}

</style>
