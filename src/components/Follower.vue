<template>
  <div @click="goToProfilePage" class="follower">
    <div class="user-photo-container">
      <img :src="getAvatar" class="user-photo" />
    </div>
    <p class="user-name">{{ follower.firstName }}</p>
  </div>
</template>

<script>
import defaultAvatar from '../assets/img/avatars/default-avatar.jpg';

export default {
  props: {
    follower: Object,
  },
  computed: {
    getAvatar() {
      return this.follower.photoLink ? this.follower.photoLink : defaultAvatar;
    },
  },
  methods: {
    goToProfilePage() {
      this.$router.push({
        name: 'profile',
        params: { id: this.follower.id },
      });
    },
  },
};
</script>

<style scoped src="../assets/styles/Follower.css"></style>
