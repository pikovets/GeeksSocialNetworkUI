<script>
import ProfileSidebarItem from './user-profile/ProfileSidebarItem.vue';

export default {
  props: {
    title: String,
    items: Array,
    itemType: String,
    routeName: String,
  },
  components: {
    ProfileSidebarItem
  },
  methods: {
    goToPage() {
      this.$router.push({
        name: this.routeName,
        params: {id: this.$route.query.id},
      });
    },
  },
};
</script>

<template>
  <div class="panel">
    <p @click="goToPage" class="title">
      {{ title }} <span class="amount">{{ items.length }}</span>
    </p>
    <div class="items-grid">
      <div v-for="item in items.slice(0, 8)" :key="item.id">
        <ProfileSidebarItem :item="item" :type="itemType"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.panel {
  @include transperent-panel-mixin;

  border: $border;
  border-radius: 10px;
  height: 258px;
  padding: 20px;

  .title {
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    color: $color-text-primary;

    &:hover {
      color: $color-text-muted;
      text-decoration: underline;
    }
  }

  .amount {
    color: $color-text-muted;
  }

  .items-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    margin-top: 10px;
  }
}
</style>
