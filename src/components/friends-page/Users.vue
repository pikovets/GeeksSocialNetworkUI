<script>
import User from './User.vue';

export default {
  props: {
    authUser: Object,
    authUserProfile: Object,
    users: Array,
    title: String,
    limit: Number,
    showNothingFoundMessage: Boolean,
  },
  components: {
    User,
  },
};
</script>

<template>
  <div class="users">
    <p v-if="title" class="users-title">{{ title }}</p>
    <div :key="user.id" v-for="user in limit ? users.slice(0, limit) : users" class="user">
      <User
        :user="user"
        :authUser="authUser"
        :authUserProfile="authUserProfile"
      />
    </div>

    <div v-if="this.users.length === 0 && showNothingFoundMessage" class="nothing-found">
      <img src="../../assets/icons/nothing-found.svg" />
      <p>{{ $t('noUsersFound') }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.users .user:last-child {
  margin-bottom: 0;
}

.users-title {
  margin-bottom: 10px;
}

.user {
  margin-bottom: 25px;
  display: grid;
  grid-template-columns: 75px 1fr 1fr;
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
