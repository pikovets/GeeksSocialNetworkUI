<template>
  <div class="panel">
    <div :key="post.id" v-for="post in posts">
      <Post :post="post" />
    </div>
  </div>
</template>

<script>
import Post from './Post.vue';

export default {
  components: {
    Post,
  },
  props: {
    posts: Array,
  },
};
</script>

<style scoped src="../assets/styles/Posts.css"></style>
