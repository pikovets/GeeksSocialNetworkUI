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
    <div class="friendship-switch-btn">
      <p>{{ isFriend ? 'Remove Friend' : 'Add Friend' }}</p>
    </div>
  </div>
</template>

<script>
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
      return this.user.photoLink
        ? this.user.photoLink
        : '/src/assets/img/avatars/default-avatar.jpg';
    },
  },
  methods: {
    isFriend() {
      return this.authUserProfile.friends.includes(this.user.id);
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
