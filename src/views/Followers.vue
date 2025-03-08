<script>
import Header from '../components/Header.vue';
import MainSidebar from '../components/MainSidebar.vue';

import {getUser, getCommunityProfile} from '../services/api.js';
import Users from "@/components/friends-page/Users.vue";

export default {
  name: 'Followers',
  components: {
    Users,
    Header,
    MainSidebar,
  },
  data() {
    return {
      showCreateCommunityDialog: false,
      followers: [],
      authUser: Object,
    };
  },
  async mounted() {
    if (!localStorage.getItem('GeeksJwtToken')) {
      this.$router.push({name: 'LogIn'});
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

      this.followers = await getCommunityProfile(this.$route.params.id);
      this.followers = this.followers.followers;
    },
  },
};
</script>

<template>
  <div id="animatedBackground">
    <Header :authUser="authUser"/>

    <div class="responsive-container">
      <MainSidebar class="main-sidebar"/>

      <div class="main-content">
        <Users
            :users="followers"
            :authUser="authUser"
            show-nothing-found-message="true"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.responsive-container {
  align-items: flex-start;
  overflow-y: auto;
}

.main-content {
  @include transperent-panel-mixin;
  width: 550px;
  border-radius: 12px;
  border: $border;
  padding: 15px 20px;
  margin-bottom: 100px;
}
</style>