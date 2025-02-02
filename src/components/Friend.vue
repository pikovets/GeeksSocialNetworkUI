<template>
  <div @click="goToProfilePage" class="friend">
    <div class="user-photo-container">
      <img :src="getAvatar" class="user-photo" />
    </div>
    <p class="user-name">{{ friend.firstName }}</p>
  </div>
</template>

<script>
import defaultAvatar from '../assets/img/avatars/default-avatar.jpg';

export default {
  props: {
    friend: Object,
  },
  computed: {
    getAvatar() {
      return this.friend.photoLink ? this.friend.photoLink : defaultAvatar;
    },
  },
  methods: {
    goToProfilePage() {
      this.$router.push({
        name: 'profile',
        params: { id: this.friend.id },
      });
    },
  },
};
</script>

<style scoped src="../assets/styles/Friend.css"></style>
