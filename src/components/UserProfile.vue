<template>
  <div class="user-profile">
    <div class="profile-picture-container">
      <img class="profile-picture" :src="getAvatar" />
    </div>
    <div class="user-status">
      <img
        :class="[
          { 'filter-green': user.isOnline },
          { 'filter-grey': !user.isOnline },
          'status-icon',
        ]"
        src="/src/assets/icons/status-circle.svg"
      />
    </div>

    <div class="profile-info">
      <div class="profile-info-header">
        <div>
          <p class="profile-name">{{ fullName }}</p>
        </div>

        <div class="interaction-buttons">
          <button class="interaction-btn">
            <i class="fas fa-user-edit"></i>
          </button>
          <button class="interaction-btn">
            <i class="fa-solid fa-gear"></i>
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

        <div class="more-info-btn">
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
  computed: {
    getAvatar() {
      return this.user.photoLink
        ? this.user.photoLink
        : '/src/assets/img/avatars/default-avatar.jpg';
    },
    fullName() {
      return `${this.profile.firstName} ${this.profile.lastName}`;
    },
  },
};
</script>

<style scoped src="/src/assets/styles/UserProfile.css"></style>
