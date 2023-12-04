<template>
  <div class="panel">
    <SidebarModule
      :icon="'/src/assets/icons/profile.svg'"
      :name="'My profile'"
    />
    <SidebarModule :icon="'/src/assets/icons/friends.svg'" :name="'Friends'" />
    <SidebarModule :icon="'/src/assets/icons/photo.svg'" :name="'Photos'" />
  </div>
</template>

<script>
import SidebarModule from './SidebarModule.vue';

export default {
  components: {
    SidebarModule,
  },
};
</script>

<style scoped src="../assets/styles/Sidebar.css"></style>
