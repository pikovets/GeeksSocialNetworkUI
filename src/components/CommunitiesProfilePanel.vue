<template>
  <div class="panel">
    <p @click="goToCommunitiesPage" class="title">
      Communities <span class="amount-communities">{{ communities.length }}</span>
    </p>
    <div class="communities-grid">
      <div :key="community.id" v-for="community in communities">
        <Community :community="community" />
      </div>
    </div>
  </div>
</template>

<script>
import Community from './Community.vue';

export default {
  components: {
    Community,
  },
  props: {
    communities: Array,
    user: Object,
  },
  methods: {
    goToCommunitiesPage() {
      this.$router.push({
        name: 'communities',
        params: { id: this.$route.query.id },
      });
    },
  },
};
</script>

<style scoped src="../assets/styles/Communities.css"></style>
