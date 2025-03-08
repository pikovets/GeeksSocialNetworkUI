<script>
import Header from '../components/Header.vue';
import MainSidebar from '../components/MainSidebar.vue';
import Users from '../components/friends-page/Users.vue';

import {
  getUser,
  getProfile,
  getFriends,
  getAcceptFriendRequests,
} from '../services/api.js';

export default {
  name: 'Friends',
  components: {
    Header,
    MainSidebar,
    Users,
  },
  data() {
    return {
      acceptFriends: [],
      friends: [],
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

      const friendsData = await getFriends(this.$route.params.id);
      this.friends = friendsData.users;

      const acceptFriendsData = await getAcceptFriendRequests(
          this.$route.params.id
      );
      this.acceptFriends = acceptFriendsData.users;
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
          v-if="acceptFriends.length !== 0"
          :users="acceptFriends"
          :authUser="authUser"
          :authUserProfile="authUserProfile"
          title="Friend requests:"
          class="accept-friends-panel"
        />

        <Users
          :users="friends"
          :authUser="authUser"
          :authUserProfile="authUserProfile"
          :show-nothing-found-message="true"
          class="users"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.users {
  @include transperent-panel-mixin;
  width: 550px;
  border-radius: 12px;
  border: $border;
  padding: 15px 20px;
  margin-bottom: 100px;
}

.accept-friends-panel {
  margin-bottom: 25px;
}
</style>