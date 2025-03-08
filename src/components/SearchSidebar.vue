<script>
import SidebarModule from './SidebarModule.vue';

export default {
  components: {
    SidebarModule,
  },
  data() {
    return {
      modules: [
        {
          name: 'All',
        },
        {
          name: 'People',
        },
        {
          name: 'Communities'
        }
      ]
    }
  },
  methods: {
    filterSearch(module) {
      this.$emit('filterSearch', module.name);
    },
  },
};
</script>

<template>
  <div class="panel">
    <SidebarModule
        v-for="module in modules"
        :key="module.id"
        @click="filterSearch(module)"
        :icon="module.icon"
        :name="module.name"
    />
  </div>
</template>

<style scoped lang="scss">
.panel {
  @include transperent-panel-mixin;
  border: $border;
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
