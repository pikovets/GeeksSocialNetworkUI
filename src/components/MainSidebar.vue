<script>
import Sidebar from './Sidebar.vue';
import ProfileIcon from '../assets/icons/profile.svg';
import FriendsIcon from '../assets/icons/friends.svg';
import CommunitiesIcon from '../assets/icons/communities.svg';

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
          link: {name: 'user-profile', params: {id: 'me'}},
        },
        {
          name: 'Friends',
          icon: FriendsIcon,
          link: {name: 'friends', params: {id: 'me'}},
        },
        {
          name: 'Communities',
          icon: CommunitiesIcon,
          link: {name: 'communities', params: {id: 'me'}},
        },
      ],
    };
  },
};
</script>

<template>
  <div class="main-sidebar" style="margin-right: 14px;">
    <Sidebar :modules="pages"/>
  </div>
</template>