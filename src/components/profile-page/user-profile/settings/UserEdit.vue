<template>
  <div class="section">
    <div class="inline-fields">
      <FormField
        v-model="userData.firstName"
        required="true"
        :label="$t('firstNameLabel')"
        :validationRule="validationRules.name"
        :validationMsg="$t('nameValidationMsg')"
      ></FormField>

      <FormField
        v-model="userData.lastName"
        :label="$t('lastNameLabel')"
        :validationRule="validationRules.name"
        :validationMsg="$t('nameValidationMsg')"
      ></FormField>
    </div>
    <FormField
      v-model="profileData.birthday"
      :label="$t('birthdayLabel')"
      :validationRule="validationRules.birthday"
      :validationMsg="$t('birthdayValidationMsg')"
    ></FormField>

    <Select
      :model-value="profileData.sex"
      @update:model-value="(newValue) => (profileData.sex = newValue)"
      :placeholder="'Please select your gender'"
      :options="genderOptions"
    />
  </div>
</template>

<script>
import FormField from '../../../fields/FormField.vue';
import Select from '../../../elements/Select.vue';

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
    FormField,
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

<style scoped>
.inline-fields {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}

.inline-fields > div:first-of-type {
  margin-right: 15px;
}
</style>
