<template>
  <div class="panel">
    <div :key="post.id" v-for="post in posts">
      <Post :post="post" :user="user" :profile="profile" />
    </div>
  </div>
</template>

<script>
import Post from './Post.vue';

export default {
  props: {
    user: Object,
    profile: Object,
    posts: Array,
  },
  components: {
    Post,
  },
};
</script>

<style scoped src="../assets/styles/Posts.css"></style>
