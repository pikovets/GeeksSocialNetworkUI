<script>
export default {
  props: {
    icon: String,
    name: String,
  },
  computed: {},
};
</script>

<template>
  <div class="module">
    <div v-show="icon" class="icon-container">
      <img class="icon filter-green" :src="icon" />
    </div>

    <p class="name">{{ name }}</p>
  </div>
</template>

<style scoped lang="scss">
.module {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 7.5px;
  cursor: pointer;
  padding: 5px 2.5px;
  padding-right: 10px;
  border-radius: 5px;
}
.module:hover {
  background-color: #2c2c2c;
}
.module:active {
  background-color: #353535;
}

.icon-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
}

.icon {
  width: 20px;
  height: 20px;
  object-fit: cover;
}

.name {
  font-size: 0.8rem;
  color: $color-text-primary;
}
</style>
