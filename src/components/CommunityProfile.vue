<template>
  <div class="community-profile">
    <div class="profile-picture-container">
      <img class="profile-picture" :src="getAvatar" />
    </div>

    <div class="profile-info">
        <p class="profile-name">{{ community.name }}</p>
        <p class="description">sdfsdfsdf</p>
      </div>

      <div v-show="isUserAllowedToChangeCommunity" class="interaction-buttons">
        <button @click="goToEditCommunityProfilePage" class="interaction-btn">
          <i class="fas fa-user-edit"></i>
        </button>
      </div>
    </div>
    <div
      v-show="showAdditionalInfoButton"
      @click="$emit('onMoreInfoClick')"
      class="more-info-btn"
    >
      <i
        class="fa-solid fa-circle-info"
        style="color: #8c8e8f; margin-right: 5px"
      ></i>
      <p class="extra-info-text">Learn more info</p>
    </div>
</template>

<script>
import DefaultCommunityAvatar from '../assets/img/avatars/default-community-avatar.jpg';

export default {
  props: {
    authUser: Object,
    community: Object,
  },
  emits: ['onMoreInfoClick'],
  computed: {
    getAvatar() {
      return this.community.photoLink
        ? this.community.photoLink
        : DefaultCommunityAvatar;
    },
    showAdditionalInfoButton() {
      return this.community.description !== null;
    },
  },
  methods: {
    goToEditProfilePage() {
      this.$router.push({
        name: 'edit-community-profile',
      });
    },
  },
};
</script>

<style scoped src="/src/assets/styles/CommunityProfile.css"></style>
