<script>
import Header from '../components/Header.vue';
import AddPost from '../components/AddPost.vue';
import Posts from '../components/Posts.vue';

import { getUser} from '../services/api';

export default {
  components: {
    Header,
    AddPost,
    Posts,
  },
  async mounted() {
    if (localStorage.getItem('GeeksJwtToken') === null) {
      this.$router.push('/login');
    }

    await this.fetchUserData();
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    async fetchUserData() {
      const userData = await getUser();
      this.user = userData;
    },
  },
};
</script>

<template>
  <div id="animatedBackground">
    <Header :user="user" />
    <!-- <AddPost /> -->
    <Posts />
  </div>
</template>

<style scoped src="../assets/styles/pages/Home.css"></style>
