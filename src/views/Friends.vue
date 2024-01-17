<template>
  <div id="animatedBackground">
    <Header :authUser="authUser" />

    <div class="responsive-container">
      <MainSidebar />

      <div class="main-content">
        <Users
          :users="friends"
          :authUser="authUser"
          :authUserProfile="authUserProfile"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import MainSidebar from '../components/MainSidebar.vue';
import Users from '../components/Users.vue';

import { getUser, getProfile, getUsersByName } from '../services/api.js';

export default {
  name: 'Friends',
  components: {
    Header,
    MainSidebar,
    Users,
  },
  data() {
    return {
      friends: [
        {
          id: '9e305b70-b8a6-4cc0-9411-8c6915f21a04',
          firstName: 'Griffith',
          lastName: '',
          photoLink: '/src/assets/img/avatars/griffith.png',
        },
        {
          id: '9e305b70-b8a6-4cc0-9411-8c6915f21a04',
          firstName: 'Casca',
          lastName: '',
          photoLink: '/src/assets/img/avatars/casca.jpg',
        },
        {
          id: '9e305b70-b8a6-4cc0-9411-8c6915f22a04',
          firstName: 'Judeau',
          lastName: '',
          photoLink: '/src/assets/img/avatars/judeau.jpg',
        },
        {
          id: '9e305b70-b8a6-4cc0-9411-8c6915f23a04',
          firstName: 'Pippin',
          lastName: '',
          photoLink: '/src/assets/img/avatars/pippin.jpg',
        },
        {
          id: '9e305b70-b8a6-4cc0-9411-8c6915f24a04',
          firstName: 'Farnese',
          lastName: '',
          photoLink: '/src/assets/img/avatars/farnese.jpg',
        },
      ],
      authUser: {},
      authUserProfile: {},
    };
  },
  async mounted() {
    if (!localStorage.getItem('GeeksJwtToken')) {
      this.$router.push({ name: 'LogIn' });
    }
    await this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      const userData = await getUser();
      this.authUser = userData;

      const profileData = await getProfile();
      this.authUserProfile = profileData;

      this.fetchSearchedUsersData();
    },

    async fetchFriends() {
      const searchedUsersData = await getUsersByName(
        this.$route.query.searchName
      );
      this.searchedUsers = searchedUsersData.users;
    },
  },
  watch: {
    '$route.query'() {
      this.fetchSearchedUsersData();
    },
  },
};
</script>

<style scoped src="../assets/styles/pages/Friends.css"></style>
