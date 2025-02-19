<script>
import GlowInput from '@/components/elements/GlowInput.vue';

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
    GlowInput,
  },
  data() {
    return {
      validationRules: validationRules,
    };
  },
};
</script>

<template>
  <div class="section">
    <GlowInput v-model="profileData.bio" :label="$t('bioLabel')"></GlowInput>

    <GlowInput
        v-model="profileData.address"
        :label="$t('addressLabel')"
    ></GlowInput>

    <GlowInput
        v-model="userData.photoLink"
        :label="$t('photoLinkLabel')"
        :validationRule="validationRules.photoLink"
        :validationMsg="$t('photoLinkValidationMsg')"
    ></GlowInput>
  </div>
</template>

<style scoped>
.section div {
  margin-bottom: 10px;
}
</style>