<template>
  <div class="main-sidebar">
    <Sidebar :modules="pages" />
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue';

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
          icon: '/src/assets/icons/profile.svg',
          link: { name: 'profile', params: { id: 'me' } },
        },
        {
          name: 'Friends',
          icon: '/src/assets/icons/friends.svg',
          link: { name: 'friends', params: { id: 'me' } },
        },
      ],
    };
  },
};
</script>
