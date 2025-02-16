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
      <img src="../../assets/icons/nothing-found.svg" />
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

<style scoped>
.users {
  width: 550px;
  background: rgba(36, 36, 36, 0.8);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 12px;
  border: 1px solid #8383833f;
  padding: 15px 20px;
  position: relative;
}
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
}

</style>
