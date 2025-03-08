<script>
import Community from './Community.vue';

export default {
  props: {
    authUser: Object,
    authUserProfile: Object,
    communities: Array,
    title: String,
    limit: Number,
  },
  components: {
    Community,
  },
  method: {},
};
</script>

<template>
  <div class="communities">
    <p v-if="title" class="communities-title">{{ title }}</p>
    <div :key="community.id" v-for="community in limit ? communities.slice(0, 5) : communities" class="community">
      <Community
        :community="community"
        :authUser="authUser"
        :authUserProfile="authUserProfile"
      />
    </div>

    <div v-if="this.communities.length === 0" class="nothing-found">
      <img src="../../assets/icons/nothing-found.svg" />
      <p>{{ $t('noCommunitiesFound') }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.communities .community:last-child {
  margin-bottom: 0;
}

.communities-title {
  margin-bottom: 10px;
}

.community {
  margin-bottom: 25px;
  display: grid;
  grid-template-columns: 75px 3fr 1fr;
  margin-right: 15px;
}

.nothing-found {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 25px;
}

.nothing-found img {
  width: 100px;
  height: 100px;
  margin: 75px 0 10px 0;
}

.nothing-found p {
  font-size: 24px;
  margin-bottom: 75px;
  font-weight: bold;
  color: $color-text-primary;
}
</style>