<template>
  <div id="animatedBackground">
    <Header :user="user" />

    <div class="responsive-container">
      <MainSidebar class="main-sidebar" />

      <div class="main-content">
        <UserProfile :user="user" :profile="profile" />

        <div class="sections-grid">
          <div class="post-feed">
            <AddPost :userAvatar="user.photoLink" :userName="user.firstName"/>
            <Posts :posts="posts" />
          </div>

          <Friends :friends="friends" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import UserProfile from '../components/UserProfile.vue';
import AddPost from '../components/AddPost.vue';
import Posts from '../components/Posts.vue';
import Friends from '../components/Friends.vue';
import MainSidebar from '../components/MainSidebar.vue';

import { getUser, getProfile } from '../services/api';

export default {
  components: {
    Header,
    UserProfile,
    AddPost,
    Posts,
    Friends,
    MainSidebar,
  },
  data() {
    return {
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
    await this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      const userData = await getUser(this.$route.params.id);
      this.user = userData;

      const profileData = await getProfile(this.$route.params.id);
      this.profile = profileData;
    },
  },
};
</script>

<style scoped src="../assets/styles/pages/Profile.css"></style>
