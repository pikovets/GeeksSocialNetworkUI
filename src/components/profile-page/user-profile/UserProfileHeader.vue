<script>
import DefaultAvatar from '../../../assets/img/avatars/default-avatar.jpg';

export default {
  props: {
    authUser: Object,
    user: Object,
    profile: Object,
  },
  emits: ['onMoreInfoClick'],
  computed: {
    getAvatar() {
      return this.user.photoLink ? this.user.photoLink : DefaultAvatar;
    },
    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
    showAdditionalInfoButton() {
      return (
        this.profile.bio !== null ||
        this.profile.sex !== null ||
        this.profile.birthday !== null ||
        this.profile.address !== null
      );
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

        <div
          v-show="this.authUser.id === this.user.id"
          class="interaction-buttons"
        >
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
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-profile {
  @include transperent-panel-mixin;
  border-radius: 15px;
  border: $border;
  margin-bottom: 15px;
  padding: 47.5px;

  display: flex;
  flex-direction: row;
  align-items: center;
}

.profile-picture-container {
  position: relative;
  overflow: hidden;
  border-radius: 100px;
  margin-right: 55px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-picture {
  width: 150px;
  height: 150px;
  object-fit: cover;
  position: relative;
}

.user-status {
  @include transperent-panel-mixin;
  position: absolute;
  top: 165px;
  left: 160px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 50px;
  padding: 5px;
}

.status-icon {
  width: 15px;
  height: 15px;
  object-fit: cover;
}

.profile-info {
  height: 130px;
  flex: 1;
}

.profile-info-header {
  margin-bottom: 5px;
}

.profile-name {
  font-weight: bold;
  font-size: 1.25rem;
  color: $color-text-primary;
}

.interaction-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
}

.interaction-btn {
  @include button-mixin($color-grey-light, $color-text-primary, 35px, 35px);
}

.profile-info div {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.profile-bio {
  color: $color-text-muted;
  font-size: 0.9rem;
  line-height: 150%;
  width: 350px;
  margin-bottom: 20px;
  color: $color-text-muted;
}

.address-text {
  font-size: 0.9rem;
  margin-right: 12px;
  color: $color-text-muted;
}

.more-info-btn {
  margin-left: -5px;
  padding: 5px 5px 5px 5px;
  border-radius: 5px;
  transition: background-color 0.15s ease-in-out;
}
.more-info-btn:active {
  background-color: #8c8e8f2f;
}

.extra-info-text {
  font-size: 0.9rem;
  color: #8c8e8f;
  cursor: pointer;
}
.extra-info-text:hover {
  text-decoration: underline;
}
</style>
