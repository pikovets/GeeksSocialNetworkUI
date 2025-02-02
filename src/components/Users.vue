<template>
  <div class="users">
    <p v-if="title" class="users-title">{{ title }}</p>
    <div :key="user.id" v-for="user in users" class="user">
      <User
        :user="user"
        :authUser="authUser"
        :authUserProfile="authUserProfile"
      />
    </div>

    <div v-if="this.users.length === 0" class="nothing-found">
      <img src="../assets/icons/nothing-found.svg" />
      <p>{{ $t('noUsersFound') }}</p>
    </div>
  </div>
</template>

<script>
import User from './User.vue';

export default {
  props: {
    authUser: Object,
    authUserProfile: Object,
    users: Array,
    title: String,
  },
  components: {
    User,
  },
};
</script>

<style scoped src="../assets/styles/Users.css"></style>
