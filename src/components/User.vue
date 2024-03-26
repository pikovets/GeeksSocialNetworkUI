<template>
  <div class="profile-image-container">
    <img
      @click="openUserProfile(this.user.id)"
      class="profile-image"
      :src="getAvatar"
    />
  </div>
  <div class="user-data">
    <p @click="openUserProfile(this.user.id)" class="user-name">
      {{ fullName }}
    </p>
  </div>
  <div class="interaction">
    <div @click="switchFriendshipState" class="friendship-switch-btn">
      <p>{{ getFriendButtonState }}</p>
    </div>
    <div
      v-show="
        this.userRelationship != null &&
        this.userRelationship.type === 'AUTH_USER_PENDING'
      "
      @click="cancelFriendshipRequest"
      class="friendship-switch-btn"
    >
      <p>{{ $t('cancelRequest') }}</p>
    </div>
  </div>
</template>

<script>
import {
  getFriendRequest,
  sendFriendRequest,
  acceptFriendRequest,
  removeFriendRequest,
} from '../services/api';

import DefaultAvatar from '../assets/img/avatars/default-avatar.jpg';

export default {
  props: {
    authUser: Object,
    authUserProfile: Object,
    user: Object,
  },
  computed: {
    fullName() {
      return this.user.firstName + ' ' + this.user.lastName;
    },
    getAvatar() {
      return this.user.photoLink ? this.user.photoLink : DefaultAvatar;
    },
    getFriendButtonState() {
      if (this.userRelationship === null) {
        return 'Add Friend';
      }

      switch (this.userRelationship.type) {
        case 'ACCEPTOR_PENDING':
          return 'Pending...';
        case 'AUTH_USER_PENDING':
          return 'Accept';
        case 'FRIENDS':
          return 'Remove Friend';
      }
    },
  },
  data() {
    return {
      userRelationship: {},
    };
  },
  async mounted() {
    this.userRelationship = await this.getFriendRequest(this.user.id);
  },
  methods: {
    async getFriendRequest(userId) {
      let userRelationship = await getFriendRequest(userId);

      if (userRelationship === null) {
        return null;
      }

      if (
        userRelationship.type === 'ACCEPTOR_PENDING' &&
        userRelationship.acceptor.id === this.authUser.id
      ) {
        userRelationship.type = 'AUTH_USER_PENDING';
      }

      return userRelationship;
    },
    async switchFriendshipState() {
      if (this.userRelationship === null) {
        await sendFriendRequest(this.user.id);
      } else if (this.userRelationship.type === 'AUTH_USER_PENDING') {
        await acceptFriendRequest(this.user.id);
      } else {
        await removeFriendRequest(this.user.id);
      }

      this.userRelationship = await this.getFriendRequest(this.user.id);
    },
    async cancelFriendshipRequest() {
      await removeFriendRequest(this.user.id);
      this.userRelationship = await this.getFriendRequest(this.user.id);
    },
    openUserProfile(id) {
      this.$router.push({
        name: 'profile',
        params: { id: id },
      });
    },
  },
};
</script>

<style scoped src="/src/assets/styles/User.css"></style>
