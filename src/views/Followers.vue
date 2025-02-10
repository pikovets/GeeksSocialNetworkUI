<template>
  <div id="animatedBackground">
    <Header :authUser="authUser" />

    <div class="responsive-container">
      <MainSidebar class="main-sidebar" />

      <div class="main-content">

        <Users
          :users="followers"
          :authUser="authUser"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import MainSidebar from '../components/MainSidebar.vue';

import { getUser, getCommunityProfile } from '../services/api.js';


export default {
  name: 'Friends',
  components: {
    Header,
    MainSidebar,
  },
  data() {
    return {
      showCreateCommunityDialog: false,
      followers: [],
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

      this.followers = await getCommunityProfile(this.$route.params.id).followers;
    },
  },
};
</script>

<style scoped src="../assets/styles/pages/Communities.css"></style>
