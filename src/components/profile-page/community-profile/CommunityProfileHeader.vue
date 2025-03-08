<script>
import DefaultCommunityAvatar from '../../../assets/img/avatars/default-community-avatar.jpg';

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
        name: 'edit-community-user-profile-page',
      });
    },
  },
};
</script>

<template>
  <div class="community-profile">
    <div class="profile-picture-container">
      <img class="profile-picture" :src="getAvatar" />
    </div>

    <div class="profile-info">
        <p class="profile-name">{{ community.name }}</p>
        <p class="description">{{ community.description }}</p>
      </div>
    </div>
</template>

<style scoped lang="scss">
.community-profile {
  @include transperent-panel-mixin;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
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
  margin-bottom: 10px;
}

.description {
  color: $color-text-muted;
}

.interaction-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
}

.interaction-btn {
  background-color: #383938;
  font-weight: 500;
  color: #e0e2e6;
  border: none;
  border-radius: 7px;
  width: 35px;
  height: 35px;
  margin-right: 7.5px;
}
.interaction-btn:hover {
  background-color: rgb(65, 65, 65);
}
.interaction-btn:active {
  background-color: rgb(50, 50, 50);
}

.profile-info div {
  display: flex;
  flex-direction: row;
  align-items: center;
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

.profile-info-header {
  display: flex;
  flex-direction: column;
}
</style>
