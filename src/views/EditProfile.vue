<template>
  <div id="animatedBackground">
    <Header />

    <div class="responsive-container">
      <div class="edit-profile-container">
        <p class="title">Edit your profile</p>
        <div class="edit-form">
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
            v-model="userData.birthDate"
            :label="$t('birthDateLabel')"
            :validationRule="validationRules.birthDate"
            :validationMsg="$t('birthDateValidationMsg')"
          ></FormField>

          <FormField v-model="userData.bio" :label="$t('bioLabel')"></FormField>

          <FormField
            v-model="userData.address"
            :label="$t('addressLabel')"
          ></FormField>

          <FormField
            v-model="userData.photoLink"
            :label="$t('photoLinkLabel')"
            :validationRule="validationRules.photoLink"
            :validationMsg="$t('photoLinkValidationMsg')"
          ></FormField>

          <FormField
            v-model="userData.email"
            required="true"
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
            :backendErrorMsg="backendErrors.newPassword"
            :validationRule="validationRules.password"
            :validationMsg="$t('passwordValidationMsg')"
          ></PasswordField>

          <button class="submit-btn">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import PasswordField from '../components/authentication/PasswordField.vue';
import FormField from '../components/authentication/FormField.vue';

import { validationRules } from '@/config/validationRules';

export default {
  components: {
    Header,
    FormField,
    PasswordField,
  },
  data() {
    return {
      userData: {
        firstName: '',
        lastName: '',
        birthDate: '',
        address: '',
        photoLink: '',
        email: '',
        oldPassword: '',
        newPassword: '',
      },
      backendErrors: {
        email: '',
        oldPassword: '',
        newPassword: '',
      },
      validationRules: validationRules,
    };
  },
  computed: {
    getAvatarLink() {
      return this.user.photoLink ? this.user.photoLink : '';
    },
  },
};
</script>

<style scoped src="../assets/styles/pages/EditProfile.css"></style>
