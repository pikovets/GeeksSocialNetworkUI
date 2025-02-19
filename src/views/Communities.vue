<script>
import Communities from '../components/communities-page/Communities.vue';
import Header from '../components/Header.vue';
import MainSidebar from '../components/MainSidebar.vue';
import CreateCommunity from '../components/communities-page/CreateCommunity.vue';

import { getCommunities, getProfile, getUser } from '@/services/api.js';


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

<style scoped lang="scss">
.communities-header-buttons {
  @include transperent-panel-mixin;
  width: 550px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  border: $border;
  padding: 15px 20px;
  position: relative;
  margin-bottom: 15px;
}

.create-community-btn {
  background-color: $color-primary;
  border: none;
  border-radius: 10px;
  color: $color-text-primary;
  font-weight: bold;
  font-size: 14px;
  padding: 10px 10px;
  width: 100%;
  transition: background-color 0.1s, transform 0.1s, opacity 0.1s;
}

.create-community-btn:hover {
  opacity: 0.8;;
}
</style>
