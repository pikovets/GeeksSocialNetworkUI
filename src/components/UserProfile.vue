<template>
  <div class="user-profile">
    <div class="profile-picture-container">
      <img class="profile-picture" :src="getAvatar" />
    </div>
    <div class="user-status">
      <img
        :class="[user.isOnline ? 'filter-green' : 'filter-grey', 'status-icon']"
        src="/src/assets/icons/status-circle.svg"
      />
    </div>

    <div class="profile-info">
      <div class="profile-info-header">
        <div>
          <p class="profile-name">{{ fullName }}</p>
        </div>

        <div class="interaction-buttons">
          <button @click="goToEditProfilePage" class="interaction-btn">
            <i class="fas fa-user-edit"></i>
          </button>
        </div>
      </div>

      <p class="profile-bio">{{ profile.bio }}</p>

      <div class="extra-info">
        <div v-show="profile.address" class="profile-address">
          <i
            class="fa-solid fa-map-marker-alt"
            style="color: #8c8e8f; margin-right: 5px"
          ></i>
          <p class="address-text">{{ profile.address }}</p>
        </div>

        <div @click="$emit('onMoreInfoClick')" class="more-info-btn">
          <i
            class="fa-solid fa-circle-info"
            style="color: #8c8e8f; margin-right: 5px"
          ></i>
          <p class="extra-info-text">Learn more info</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    profile: Object,
  },
  emits: ['onMoreInfoClick'],
  computed: {
    getAvatar() {
      return this.user.photoLink
        ? this.user.photoLink
        : '/src/assets/img/avatars/default-avatar.jpg';
    },
    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
  },
  methods: {
    goToEditProfilePage() {
      this.$router.push({
        name: 'edit-profile',
      });
    },
  },
};
</script>

<style scoped src="/src/assets/styles/UserProfile.css"></style>
