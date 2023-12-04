<template>
  <div class="module">
    <div class="icon-container">
      <img class="icon filter-green" :src="icon" />
    </div>

    <p class="name">{{ name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    name: String,
  },
};
</script>

<style scoped src="../assets/styles/SidebarModule.css"></style>
