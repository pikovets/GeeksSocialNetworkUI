<template>
  <div class="panel">
    <p class="title">
      Friends <span class="amount-friends">{{ friends.length }}</span>
    </p>
    <div class="friends-grid">
      <div :key="friend.id" v-for="friend in friends">
        <Friend :friend="friend" />
      </div>
    </div>
  </div>
</template>

<script>
import Friend from './Friend.vue';

export default {
  components: {
    Friend,
  },
  props: {
    friends: Array,
  },
};
</script>

<style scoped src="../assets/styles/Friends.css"></style>
