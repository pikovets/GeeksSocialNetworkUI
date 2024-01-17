<template>
  <div id="animatedBackground">
    <Header :authUser="authUser" />

    <div class="responsive-container">
      <MainSidebar class="main-sidebar" />

      <div class="main-content">
        <UserProfile
          @onMoreInfoClick="showAdditionalInfo = true"
          :user="user"
          :profile="profile"
        />

        <div class="sections-grid">
          <div class="post-feed">
            <AddPost :authUser="user" />
            <Posts
              @delete-post="deletePost"
              :posts="posts"
              :authUser="authUser"
            />
          </div>

          <Friends :friends="friends" />
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

import { getUser, getProfile, getPosts, deletePost } from '../services/api';

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
      friends: [
        {
          id: '9e305b70-b8a6-4cc0-9411-8c6915f21a04',
          name: 'Griffith',
          photo: '/src/assets/img/avatars/griffith.png',
        },
        {
          id: '9e305b70-b8a6-4cc0-9411-8c6915f21a04',
          name: 'Casca',
          photo: '/src/assets/img/avatars/casca.jpg',
        },
        {
          id: '9e305b70-b8a6-4cc0-9411-8c6915f22a04',
          name: 'Judeau',
          photo: '/src/assets/img/avatars/judeau.jpg',
        },
        {
          id: '9e305b70-b8a6-4cc0-9411-8c6915f23a04',
          name: 'Pippin',
          photo: '/src/assets/img/avatars/pippin.jpg',
        },
        {
          id: '9e305b70-b8a6-4cc0-9411-8c6915f24a04',
          name: 'Farnese',
          photo: '/src/assets/img/avatars/farnese.jpg',
        },
      ],
      posts: [],
    };
  },
  async mounted() {
    if (localStorage.getItem('GeeksJwtToken') === null) {
      this.$router.push('/login');
    }

    await this.fetchUserData();
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
