<script>
import ProfileSidebarItem from './user-profile/ProfileSidebarItem.vue';

export default {
  props: {
    title: String,
    items: Array,
    itemType: String,
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
      <div v-for="item in items" :key="item.id">
        <ProfileSidebarItem :item="item" type="itemType"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$panel-bg: rgba(36, 36, 36, 0.8);
$panel-shadow: rgba(0, 0, 0, 0.1);
$panel-border: #8383833f;

.panel {
  background: $panel-bg;
  box-shadow: 0 4px 30px $panel-shadow;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid $panel-border;
  border-radius: 10px;
  height: 225px;
  padding: 20px;

  .title {
    font-weight: 500;
    cursor: pointer;

    &:hover {
      color: rgb(207, 207, 207);
      text-decoration: underline;
    }
  }

  .amount {
    font-weight: 300;
  }

  .items-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    margin-top: 10px;
  }
}
</style>
