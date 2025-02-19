<script>
export default {
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  emits: ['update:modelValue'],
};
</script>

<template>
  <select
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="select"
  >
    <option value="" disabled>{{ placeholder }}</option>
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<style scoped lang="scss">
.select {
  padding: 10px 10px 10px 10px;
  background-color: #3f3f3f;
  border-radius: 5px;
  margin-bottom: 5px;
  margin-bottom: 15px;
  color: $color-text-primary;
  border-style: none;
  width: 100%;
}
.select:placeholder {
  color: #9e9e9e;
}
</style>
