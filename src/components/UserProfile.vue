<template>
  <div class="user-profile">
    <div class="profile-picture-container">
      <img class="profile-picture" :src="profile.photo" />
    </div>
    <div class="user-status">
      <img
        :class="[
          { 'filter-green': profile.isOnline },
          { 'filter-grey': !profile.isOnline },
          'status-icon',
        ]"
        src="../assets/icons/status-circle.svg"
      />
    </div>

    <div class="profile-info">
      <div class="profile-info-header">
        <div>
          <p class="profile-name">{{ profile.name }}</p>
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
        <div class="profile-address">
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
    profile: Object,
  },
};
</script>

<style scoped src="../assets/styles/UserProfile.css"></style>
