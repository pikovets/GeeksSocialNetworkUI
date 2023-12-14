<template>
  <div id="animatedBackground">
    <Header :user="user"/>

    <div class="responsive-container">
      <MainSidebar />

      <div class="edit-profile-container">
        <p class="title">{{ formatTabName }}</p>
        <div class="edit-form">
          <UserEdit
            v-show="isUserEditPage"
            :userData="user"
            :profileData="profile"
          />

          <ProfileEdit
            v-show="isProfileEditPage"
            :profileData="profile"
            :userData="user"
          />

          <SecurityEdit
            v-show="isSecurityEditPage"
            :userData="user"
            :backendErrors="backendErrors"
            :oldPassword="user.oldPassword"
            :newPassword="user.newPassword"
          />

          <button
            @click="saveChanges"
            class="save-btn"
            :disabled="!isFormValid"
          >
            Save
          </button>
        </div>
      </div>

      <SettingsSidebar :selectedIndex="selectedPage" />
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import MainSidebar from '../components/MainSidebar.vue';
import PasswordField from '../components/fields/PasswordField.vue';
import FormField from '../components/fields/FormField.vue';
import SettingsSidebar from '../components/SettingsSidebar.vue';
import UserEdit from '../components/settings/UserEdit.vue';
import ProfileEdit from '../components/settings/ProfileEdit.vue';
import SecurityEdit from '../components/settings/SecurityEdit.vue';

import { validationRules } from '@/config/validationRules';
import { getUser, getProfile, updateUser } from '../services/api';

export default {
  components: {
    Header,
    MainSidebar,
    FormField,
    PasswordField,
    SettingsSidebar,
    UserEdit,
    ProfileEdit,
    SecurityEdit,
  },
  data() {
    return {
      user: { oldPassword: '', newPassword: '' },
      profile: {},
      backendErrors: {
        email: '',
        oldPassword: '',
      },
      isUserEditPage: false,
      isProfileEditPage: false,
      isSecurityEditPage: false,
      validationRules: validationRules,
      selectedPage: 0,
    };
  },
  async mounted() {
    if (!localStorage.getItem('GeeksJwtToken')) {
      this.$router.push({ name: 'LogIn' });
    }
    await this.fetchUserData();

    this.tabHandler(this.$route.query, this.$route.query);
  },
  computed: {
    getAvatarLink() {
      return this.profile.photoLink ? this.profile.photoLink : '';
    },
    formatTabName() {
      if (!this.$route.query.tab) return 'Personal Information';

      let words = this.$route.query.tab.split('-');

      let capitalizedWords = words.map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });

      let resultString = capitalizedWords.join(' ');

      return resultString;
    },
  },
  watch: {
    '$route.query': {
      handler: function (newQuery, oldQuery) {
        this.tabHandler(newQuery, oldQuery);
      },
      deep: true,
    },
  },
  methods: {
    async fetchUserData() {
      this.user = await getUser();

      this.profile = await getProfile();

      this.profile.birthday = new Date(
        this.profile.birthday
      ).toLocaleDateString();
    },
    async saveChanges() {
      await updateUser(this.user, this.profile);
      this.$router.push({ name: 'profile', params: { id: 'me' } });
    },
    isFormValid() {
      return (
        this.isRequiredFieldValid(this.user.firstName, 'name') &&
        this.isNotRequiredFieldValid(this.user.lastName, 'name') &&
        this.isRequiredFieldValid(this.user.email, 'email') &&
        this.isValidField(this.profile.birthday, 'birthday') &&
        this.isValidField(this.user.photoLink, 'photoLink') &&
        this.isNotRequiredFieldValid(this.user.oldPassword, 'password') &&
        this.isNotRequiredFieldValid(this.user.newPassword, 'password')
      );
    },
    tabHandler(newQuery, oldQuery) {
      const tabs = {
        'personal-information': { index: 0, page: 'isUserEditPage' },
        profile: { index: 1, page: 'isProfileEditPage' },
        security: { index: 2, page: 'isSecurityEditPage' },
      };

      const selectedTab = newQuery.tab || 'personal-information';
      const selectedTabInfo = tabs[selectedTab];

      this.isUserEditPage = false;
      this.isProfileEditPage = false;
      this.isSecurityEditPage = false;
      this.selectedPage = selectedTabInfo.index;

      this[selectedTabInfo.page] = true;
    },
    isRequiredFieldValid(value, fieldName) {
      return (
        value !== '' &&
        this.validationRules[fieldName].test(value) &&
        this.backendErrors[fieldName] === ''
      );
    },
    isNotRequiredFieldValid(value, fieldName) {
      return value === '' || this.validationRules[fieldName].test(value);
    },
  },
};
</script>

<style scoped src="../assets/styles/pages/EditProfile.css"></style>
