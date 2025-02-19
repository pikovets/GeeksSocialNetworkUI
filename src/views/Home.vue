<script>
import Header from '../components/Header.vue';
import AddPost from '../components/AddPost.vue';
import Posts from '../components/post/Posts.vue';
import MainSidebar from '../components/MainSidebar.vue';

import {getFeed, getUser} from '../services/api';

export default {
  components: {
    Header,
    AddPost,
    Posts,
    MainSidebar,
  },
  async mounted() {
    if (localStorage.getItem('GeeksJwtToken') === null) {
      this.$router.push('/login');
    }

    await this.fetchUserData();
  },
  data() {
    return {
      authUser: {},
      posts: [],
    };
  },
  methods: {
    async fetchUserData() {
      const authUserData = await getUser('me');
      this.authUser = authUserData;

      const postsData = await getFeed();
      this.posts = postsData.posts;
    },
  },
};
</script>

<template>
  <div id="animatedBackground">
    <Header :authUser="authUser"/>

    <div class="responsive-container">
      <MainSidebar class="main-sidebar"/>

      <div class="main-content">
        <div class="post-feed">
          <AddPost :authUser="authUser"/>

          <Posts :posts="posts" :authUser="authUser" style="width: 850px"/>
        </div>
      </div>
    </div>
  </div>
</template>