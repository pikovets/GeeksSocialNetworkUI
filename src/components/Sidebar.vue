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

<style scoped lang="scss">
.panel {
  background: rgba(36, 36, 36, 0.8);
  border: $border;
  backdrop-filter: blur(5px);
  width: 150px;
  padding: 10px;
  padding-bottom: 0;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
}

.active-tab {
  background-color: #383838;
}
</style>
