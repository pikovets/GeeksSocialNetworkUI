<template>
  <div class="communities">
    <p v-if="title" class="communities-title">{{ title }}</p>
    <div :key="community.id" v-for="community in communities" class="community">
      <Community
        :community="community"
        :authUser="authUser"
        :authUserProfile="authUserProfile"
      />
    </div>

    <div v-if="this.communities.length === 0" class="nothing-found">
      <img src="../assets/icons/nothing-found.svg" />
      <p>{{ $t('noCommunitiesFound') }}</p>
    </div>
  </div>
</template>

<script>
import Community from './Community.vue';

export default {
  props: {
    authUser: Object,
    authUserProfile: Object,
    communities: Array,
    title: String,
  },
  components: {
    Community,
  },
};
</script>

<style scoped src="../assets/styles/Communities.css"></style>
