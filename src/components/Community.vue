<template>
  <div class="profile-image-container">
    <img
      @click="openCommunityPage(this.community.id)"
      class="profile-image"
      :src="getAvatar"
    />
  </div>
  <div class="community-data">
    <p @click="openCommunityPage(this.community.id)" class="community-name">
      {{ this.community.name }}
    </p>
  </div>
  <div class="interaction">
    <div
      @click="switchSubscriptionState"
      class="community-subscription-state-switch-btn"
    >
      <p>{{ getUserCommunityState }}</p>
    </div>
  </div>
</template>

<script>
import {
  getUserCommunityState,
  joinCommunity,
  leaveCommunity,
} from '../services/api';

import DefaultCommunityAvatar from '../assets/img/avatars/default-community-avatar.jpg';

export default {
  props: {
    authUser: Object,
    authUserProfile: Object,
    user: Object,
  },
  computed: {
    getAvatar() {
      return this.community.photoLink
        ? this.community.photoLink
        : DefaultCommunityAvatar;
    },
    getUserCommunityState() {
      if (this.userCommunityState === null) {
        return 'Follow';
      } else {
        return 'Unfollow';
      }
    },
  },
  data() {
    return {
      userCommunityState: {},
    };
  },
  async mounted() {
    this.userCommunityState = await getUserCommunityState(this.community.id);
  },
  methods: {
    async switchSubscriptionState() {
      if (this.userCommunityState === null) {
        await joinCommunity(this.community.id);
      } else {
        await leaveCommunity(this.community.id);
      }

      this.userCommunityState = await this.getUserCommunityState(
        this.community.id
      );
    },
    openCommunityProfile(id) {
      this.$router.push({
        name: 'community',
        params: { id: id },
      });
    },
  },
};
</script>

<style scoped src="/src/assets/styles/Community.css"></style>
