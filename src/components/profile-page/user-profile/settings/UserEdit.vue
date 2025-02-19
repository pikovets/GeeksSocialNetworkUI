<script>
import GlowInput from '@/components/elements/GlowInput.vue';
import Select from '@/components/elements/Select.vue';

import { validationRules } from '@/config/validationRules';

export default {
  props: {
    userData: {
      type: Object,
      required: true,
    },
    profileData: {
      type: Object,
      required: true,
    },
  },
  components: {
    GlowInput,
    Select,
  },
  data() {
    return {
      validationRules: validationRules,
      genderOptions: ['Male', 'Female', 'Other'],
    };
  },
  methods: {
    updateSelectedGender(newGender) {
      this.profileData.sex = newGender;
    },
  },
};
</script>

<template>
  <div class="section">
    <div class="inline-fields">
      <GlowInput
        v-model="userData.firstName"
        required="true"
        :label="$t('firstNameLabel')"
        :validationRule="validationRules.name"
        :validationMsg="$t('nameValidationMsg')"
      ></GlowInput>

      <GlowInput
        v-model="userData.lastName"
        :label="$t('lastNameLabel')"
        :validationRule="validationRules.name"
        :validationMsg="$t('nameValidationMsg')"
      ></GlowInput>
    </div>
    <GlowInput
      v-model="profileData.birthday"
      :label="$t('birthdayLabel')"
      :validationRule="validationRules.birthday"
      :validationMsg="$t('birthdayValidationMsg')"
    ></GlowInput>

    <Select
      :model-value="profileData.sex"
      @update:model-value="(newValue) => (profileData.sex = newValue)"
      :placeholder="'Please select your gender'"
      :options="genderOptions"
    />
  </div>
</template>

<style scoped>
.inline-fields {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}

.inline-fields > div:first-of-type {
  margin-right: 15px;
}

.section div {
  margin-bottom: 10px;
}
</style>
