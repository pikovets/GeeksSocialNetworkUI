<template>
  <div class="panel">
    <p @click="goToPage" class="title">
      {{ title }} <span class="amount">{{ items.length }}</span>
    </p>
    <div class="items-grid">
      <div v-for="item in items" :key="item.id">
        <component :is="componentName" :[itemPropName]="item" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    items: Array,
    routeName: String,
    componentName: String,
    itemPropName: String,
  },
  methods: {
    goToPage() {
      this.$router.push({
        name: this.routeName,
        params: { id: this.$route.query.id },
      });
    },
  },
};
</script>

<style scoped src="/src/assets/styles/ProfileSidebarSection.css"></style>
