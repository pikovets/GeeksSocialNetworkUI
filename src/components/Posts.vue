<template>
  <div class="panel">
    <div :key="post.id" v-for="post in posts">
      <Post @delete-post="deletePost" :post="post" :authUser="authUser" />
    </div>
  </div>
</template>

<script>
import Post from './Post.vue';

export default {
  props: {
    authUser: Object,
    posts: Array,
  },
  emits: ['delete-post'],
  components: {
    Post,
  },
  methods: {
    deletePost(postId) {
      this.$emit('delete-post', postId);
    },
  },
};
</script>

<style scoped src="../assets/styles/Posts.css"></style>
