<template>
  <div id="animatedBackground">
    <Header />

    <div class="responsive-container">
      <Sidebar />

      <div class="main-content">
        <UserProfile :profile="profile" />

        <div class="sections-grid">
          <Posts :posts="posts" />
          <Friends :friends="friends" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import UserProfile from '../components/UserProfile.vue';
import Posts from '../components/Posts.vue';
import Friends from '../components/Friends.vue';
import Sidebar from '../components/Sidebar.vue';

export default {
  components: {
    Header,
    UserProfile,
    Posts,
    Friends,
    Sidebar,
  },
  data() {
    return {
      profile: {
        name: 'Guts',
        photo: '/src/assets/img/avatars/berserk.jpg',
        isOnline: true,
        bio: 'Что вершит судьбу человечества в этом мире? Некое незримое существо или закон, подобно Длани Господней парящей над миром',
        address: 'Midland',
      },
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
};
</script>

<style scoped src="../assets/styles/Profile.css"></style>
