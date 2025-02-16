<template>
  <div class="section">
    <FormField v-model="profileData.bio" :label="$t('bioLabel')"></FormField>

    <FormField
      v-model="profileData.address"
      :label="$t('addressLabel')"
    ></FormField>

    <FormField
      v-model="userData.photoLink"
      :label="$t('photoLinkLabel')"
      :validationRule="validationRules.photoLink"
      :validationMsg="$t('photoLinkValidationMsg')"
    ></FormField>
  </div>
</template>

<script>
import FormField from '../../../fields/FormField.vue';

import { validationRules } from '@/config/validationRules';

export default {
  props: {
    profileData: {
      type: Object,
      required: true,
    },
    userData: {
      type: Object,
      required: true,
    },
  },
  components: {
    FormField,
  },
  data() {
    return {
      validationRules: validationRules,
    };
  },
};
</script>

<style scoped></style>
