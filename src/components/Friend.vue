<template>
  <div class="friend">
    <div class="user-photo-container">
      <img :src="friend.photo" class="user-photo" />
    </div>
    <p class="user-name">{{ friend.name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    friend: Object,
  },
};
</script>

<style scoped src="../assets/styles/Friend.css"></style>
