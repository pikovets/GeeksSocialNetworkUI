<template>
  <div class="panel">
    <SidebarModule
      v-for="(module, index) in modules"
      :key="module.id"
      @click="selectTab(index)"
      :icon="module.icon"
      :name="module.name"
      :class="{ 'active-tab': selectedIndex === index && activeTabChange }"
    />
  </div>
</template>

<script>
import SidebarModule from './SidebarModule.vue';

export default {
  props: {
    modules: Array,
    activeTabChange: {
      type: Boolean,
      default: false,
    },
    selectedIndex: {
      type: Number,
      default: 0,
    },
  },
  components: {
    SidebarModule,
  },
  methods: {
    selectTab(index) {
      this.$router.push({
        name: this.modules[index].link.name,
        query: this.modules[index].link.query || {},
        params: this.modules[index].link.params || {},
      });
    },
  },
};
</script>

<style scoped>
@import '../assets/styles/Sidebar.css';
</style>
