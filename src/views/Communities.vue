<template>
  <div id="animatedBackground">
    <Header :authUser="authUser" />

    <div class="responsive-container">
      <MainSidebar class="main-sidebar" />

      <div class="main-content">
        <Communities
          :communities="communities"
          :authUser="authUser"
          :authUserProfile="authUserProfile"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import MainSidebar from '../components/MainSidebar.vue';
import Communities from '../components/Communities.vue';

import {
  getUser,
  getProfile,
  getCommunities
} from '../services/api.js';

export default {
  name: 'Friends',
  components: {
    Header,
    MainSidebar,
    Communities,
  },
  data() {
    return {
      communities: [],
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
  watch: {
    '$route.query'() {
      this.$router.go();
    },
  },
  methods: {
    async fetchUserData() {
      this.authUser = await getUser();

      this.authUserProfile = await getProfile(this.$route.params.id);

      const communitiesData = await getCommunities(this.$route.params.id);
      this.communities = communitiesData.communities;

    },
  },
};
</script>

<style scoped src="../assets/styles/pages/Friends.css"></style>
