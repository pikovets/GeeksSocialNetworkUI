<template>
  <div class="settings-sidebar">
    <Sidebar
      :modules="pages"
      :activeTabChange="true"
      :selectedIndex="selectedIndex"
    />
  </div>
</template>

<script>
import Sidebar from '../../../Sidebar.vue';

export default {
  name: 'SettingsSidebar',
  props: {
    selectedIndex: {
      type: Number,
      default: 0,
    },
  },
  components: {
    Sidebar,
  },
  data() {
    return {
      pages: [
        {
          name: 'Personal information',
          link: {
            name: 'edit-profile',
            query: { tab: 'personal-information' },
          },
        },
        {
          name: 'Profile',
          link: {
            name: 'edit-profile',
            query: { tab: 'profile' },
          },
        },
        {
          name: 'Security',
          link: {
            name: 'edit-profile',
            query: { tab: 'security' },
          },
        },
      ],
    };
  },
};
</script>

<style scoped>
.settings-sidebar {
  width: 200px;
}
</style>
