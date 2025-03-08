<script>
import {
  fetchUserCommunityState,
  joinCommunity,
  leaveCommunity,
} from '../../services/api';

import { errorMessages } from '../../config/errorMessages';

import DefaultCommunityAvatar from '../../assets/img/avatars/default-community-avatar.jpg';

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
      userCommunityState: null,
    };
  },
  async mounted() {
    this.userCommunityState = await fetchUserCommunityState(this.community.id);
  },
  methods: {
    async switchSubscriptionState() {
      if (!this.userCommunityState) {
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
        name: 'community-profile',
        params: { id: id },
      });
    },
  },
};
</script>

<template>
  <div class="profile-image-container">
    <img
        @click="openCommunityProfile(this.community.id)"
        class="profile-image"
        :src="getAvatar"
    />
  </div>
  <div class="community-data">
    <p @click="openCommunityProfile(this.community.id)" class="community-name">
      {{ this.community.name }}
    </p>
  </div>
  <div class="interaction">
    <div
        @click="switchSubscriptionState"
        class="community-subscription-state-switch-btn"
        :style="getUserCommunityState === 'Unfollow' ? 'background-color: #cc3300' : ''"
    >
      <p>{{ getUserCommunityState }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile-image {
  width: 75px;
  height: 75px;
  object-fit: cover;
  border-radius: 50px;
  cursor: pointer;
}

.community-name {
  margin-left: 15px;
  margin-top: 10px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  color: $color-text-primary;
}
.community-name:hover {
  text-decoration: underline;
}

.interaction {
  display: flex;
  align-items: center;
  gap: 10px;
}

.community-subscription-state-switch-btn {
  @include button-mixin($color-primary, black, 100%, 50%);
  padding: 7.5px 0 7.5px 0;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.1s ease-in-out;
}

.community-subscription-state-switch-btn p {
  color: black;
  font-size: 14px;
  text-align: center;
}
</style>
