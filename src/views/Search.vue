<script>
import Header from '../components/Header.vue';
import MainSidebar from '../components/MainSidebar.vue';
import Users from '../components/friends-page/Users.vue';

import { getUser, getProfile, getUsersByName } from '../services/api.js';

export default {
  name: 'Search',
  components: {
    Header,
    MainSidebar,
    Users,
  },
  data() {
    return {
      searchedUsers: [],
      authUser: {},
      authUserProfile: {},
    };
  },
  async mounted() {
    if (!localStorage.getItem('GeeksJwtToken')) {
      this.$router.push({ name: 'LogIn' });
    }
    await this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      const userData = await getUser();
      this.authUser = userData;

      const profileData = await getProfile();
      this.authUserProfile = profileData;

      this.fetchSearchedUsersData();
    },

    async fetchSearchedUsersData() {
      const searchedUsersData = await getUsersByName(
        this.$route.query.searchQuery
      );
      this.searchedUsers = searchedUsersData.users;

      this.searchedUsers = this.searchedUsers.filter(
        (user) => user.id !== this.authUser.id
      );
    },
  },
  watch: {
    '$route.query'() {
      this.fetchSearchedUsersData();
    },
  },
};
</script>

<template>
  <div id="animatedBackground">
    <Header :authUser="authUser" />

    <div class="responsive-container">
      <MainSidebar class="main-sidebar" />

      <div class="main-content">
        <Users
          :users="searchedUsers"
          :authUser="authUser"
          :authUserProfile="authUserProfile"
        />
      </div>
    </div>
  </div>
</template>