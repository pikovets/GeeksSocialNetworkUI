<template>
  <div id="animatedBackground">
    <Header :authUser="authUser" />

    <div class="responsive-container">
      <MainSidebar class="main-sidebar" />

      <div class="main-content">
        <div class="communities-header-buttons">
          <button
            class="create-community-btn"
            @click="showCreateCommunityDialog = true"
          >
            {{ $t('createCommunityLabel') }}
          </button>
        </div>

        <Communities
          :communities="communities"
          :authUser="authUser"
          :authUserProfile="authUserProfile"
        />
      </div>
    </div>
  </div>

  <CreateCommunity
    @onCloseCommunityCreation="showCreateCommunityDialog = false"
    v-show="showCreateCommunityDialog"
  >
  </CreateCommunity>
</template>

<script>
import Communities from '../components/Communities.vue';
import Header from '../components/Header.vue';
import MainSidebar from '../components/MainSidebar.vue';
import CreateCommunity from '../components/CreateCommunity.vue';

import { getCommunities, getProfile, getUser } from '../services/api.js';


export default {
  name: 'Friends',
  components: {
    Header,
    MainSidebar,
    Communities,
    CreateCommunity
  },
  data() {
    return {
      showCreateCommunityDialog: false,
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

<style scoped src="../assets/styles/pages/Communities.css"></style>
