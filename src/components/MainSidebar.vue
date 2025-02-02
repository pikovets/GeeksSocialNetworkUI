<template>
  <div class="main-sidebar">
    <Sidebar :modules="pages" />
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue';
import ProfileIcon from '../assets/icons/profile.svg';
import FriendsIcon from '../assets/icons/friends.svg';

export default {
  name: 'MainSidebar',
  components: {
    Sidebar,
  },
  data() {
    return {
      pages: [
        {
          name: 'Profile',
          icon: ProfileIcon,
          link: { name: 'profile', params: { id: 'me' } },
        },
        {
          name: 'Friends',
          icon: FriendsIcon,
          link: { name: 'friends', params: { id: 'me' } },
        },
      ],
    };
  },
};
</script>

<style scoped src="../assets/styles/MainSidebar.css"></style>
