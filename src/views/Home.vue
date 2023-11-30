<script>
import Header from '../components/Header.vue';
import AddPost from '../components/AddPost.vue';
import Posts from '../components/Posts.vue';

export default {
  components: {
    Header,
    AddPost,
    Posts,
  },
  mounted() {
    if (localStorage.getItem('GeeksJwtToken') === null) {
      this.$router.push('/login');
    }
  },
};
</script>

<template>
  <Header />
  <AddPost />
  <Posts />
</template>

<style></style>