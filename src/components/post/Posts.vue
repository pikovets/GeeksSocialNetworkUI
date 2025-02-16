<script>
import Post from './Post.vue';

export default {
  props: {
    authUser: Object,
    posts: Array,
  },
  emits: ['delete-post', 'update-post'],
  components: {
    Post,
  },
  methods: {
    deletePost(postId) {
      this.$emit('delete-post', postId);
    },
    updatePost(postId) {
      this.$emit('update-post', postId);
    },
  },
};
</script>

<template>
  <div class="panel">
    <div :key="post.id" v-for="post in posts">
      <Post
        @delete-post="deletePost"
        @update-post="updatePost"
        :post="post"
        :authUser="authUser"
      />
    </div>
  </div>
</template>