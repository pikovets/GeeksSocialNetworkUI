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
  fetchUserCommunityState,
  joinCommunity,
  leaveCommunity,
} from '../services/api';

import { errorMessages } from '../config/errorMessages';

import DefaultCommunityAvatar from '../assets/img/avatars/default-community-avatar.jpg';

export default {
  props: {
    authUser: Object,
    authUserProfile: Object,
    community: Object,
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
      isOnline: window.navigator.onLine,
      isLoading: false,
      userCommunityState: {},
    };
  },
  async mounted() {
    this.userCommunityState = await fetchUserCommunityState(this.community.id);
  },
  methods: {
    async switchSubscriptionState() {
      if (this.userCommunityState === null) {
        await joinCommunity(this.community.id);
      } else {
        await leaveCommunity(this.community.id);
      }

      try {
        if (!this.isOnline) {
          alert(this.$i18n.t('offlineErrorMsg'));
          return;
        }

        this.interval = setTimeout(() => {
          this.isLoading = true;
        }, 500);

        this.userCommunityState = await fetchUserCommunityState(
          this.community.id
        );

        this.isLoading = false;
        clearInterval(this.interval);
      } catch (error) {
        this.handleErrors(error);
      }
    },
    handleErrors(error) {
      this.isLoading = false;
      clearInterval(this.interval);

      console.log(error.message);

      if (error.message === errorMessages.TIMEOUT) {
        alert(this.$i18n.t('timeoutErrorMsg'));
      } else if (error.message === errorMessages.FETCH_FAILED) {
        alert(this.$i18n.t('serverErrorMsg'));
      } else if (error.message === 'User not found in community') {
        this.userCommunityState = null;
      }
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
