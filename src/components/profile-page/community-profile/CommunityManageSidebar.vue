<script>
import Sidebar from "@/components/Sidebar.vue";
import SettingsIcon from '@/assets/icons/settings.svg';


export default {
  name: "CommunityProfileSidebar",
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  components: {
    Sidebar
  },
  data() {
    return {
      pages: [
        {
          name: 'Manage',
          icon: SettingsIcon,
          link: {
            name: 'community-profile-manage',
            params: {
              id: this.id,
            }
          }
        }
      ]
    }
  }
}
</script>

<template>
<Sidebar :modules="pages"/>
</template>

<style scoped lang="scss">
.panel {
  width: 100%;
  height: 50px;
  border-radius: 10px;
  padding-left: 15px
}
</style>