<template>
  <div class="panel">
    <p @click="goToFriendsPage" class="title">
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
    user: Object,
  },
  methods: {
    goToFriendsPage() {
      this.$router.push({
        name: 'friends',
        params: { id: this.$route.query.id },
      });
    },
  },
};
</script>

<style scoped src="../assets/styles/Friends.css"></style>
