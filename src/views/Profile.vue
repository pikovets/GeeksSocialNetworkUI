<template>
  <div id="animatedBackground">
    <Header :authUser="authUser" />

    <div class="responsive-container">
      <MainSidebar class="main-sidebar" />

      <div class="main-content">
        <UserProfile
          @onMoreInfoClick="showAdditionalInfo = true"
          :authUser="authUser"
          :user="user"
          :profile="profile"
        />

        <div class="sections-grid">
          <div class="post-feed">
            <AddPost
              v-show="user.id === authUser.id"
              :authUser="user"
              :posts="posts"
            />
            <Posts
              @delete-post="deletePost"
              @update-post="updatePost"
              :posts="posts"
              :authUser="authUser"
            />
          </div>

          <Friends :user="user" :friends="friends" />
        </div>
      </div>
    </div>
  </div>

  <MoreInfo
    @onCloseMoreInfo="showAdditionalInfo = false"
    v-show="showAdditionalInfo"
    :authProfile="profile"
  />
</template>

<script>
import Header from '../components/Header.vue';
import UserProfile from '../components/UserProfile.vue';
import AddPost from '../components/AddPost.vue';
import Posts from '../components/Posts.vue';
import Friends from '../components/Friends.vue';
import MainSidebar from '../components/MainSidebar.vue';
import MoreInfo from '../components/MoreInfo.vue';

import {
  getUser,
  getProfile,
  getPosts,
  getPost,
  deletePost,
  getFriends,
} from '../services/api';

export default {
  components: {
    Header,
    UserProfile,
    AddPost,
    Posts,
    Friends,
    MainSidebar,
    MoreInfo,
  },
  data() {
    return {
      showAdditionalInfo: false,
      authUser: {},
      user: {},
      profile: {},
      friends: [],
      posts: [],
    };
  },
  async mounted() {
    if (localStorage.getItem('GeeksJwtToken') === null) {
      this.$router.push('/login');
    }

    await this.fetchUserData();
  },
  watch: {
    '$route.query'() {
      this.$router.go();
    },
  },
  methods: {
    async fetchUserData() {
      const authUserData = await getUser('me');
      this.authUser = authUserData;

      const userData = await getUser(this.$route.params.id);
      this.user = userData;

      const profileData = await getProfile(this.$route.params.id);
      this.profile = profileData;

      const postsData = await getPosts(this.$route.params.id);
      this.posts = postsData.posts;

      const friendsData = await getFriends(this.$route.params.id);
      this.friends = friendsData.users;
    },
    async deletePost(postId) {
      const response = await deletePost(postId);

      if (response.ok) {
        this.posts = this.posts.filter((post) => post.id !== postId);
      }
    },
  },
};
</script>

<style scoped src="../assets/styles/pages/Profile.css"></style>
