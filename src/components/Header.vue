<script>
import DefaultAvatar from '../assets/img/avatars/default-avatar.jpg';

export default {
  props: {
    authUser: Object,
  },
  data() {
    return {
      isAuthenticated: localStorage.getItem('GeeksJwtToken'),
      searchQuery: '',
    };
  },
  computed: {
    userAvatar() {
      return this.authUser?.photoLink || DefaultAvatar;
    },
  },
  methods: {
    navigateToHome() {
      this.$router.push({ name: 'home' });
    },
    navigateToProfile() {
      this.$router.push({ name: 'user-profile', params: { id: 'me' } });
    },
    handleLogout() {
      localStorage.removeItem('GeeksJwtToken');
      this.$router.push({ name: 'login' });
    },
    performSearch() {
      if (!this.searchQuery.trim()) return;
      
      this.$router.push({
        name: 'search',
        query: { searchQuery: this.searchQuery.replace(/\s/g, '') },
      });
    },
  },
};
</script>

<template>
  <header class="header">
    <div class="header-container">
      <div @click="navigateToHome" class="logo-wrapper">
        <img src="../assets/img/logo.png" class="logo" />
      </div>

      <div class="search-container" v-if="isAuthenticated">
        <i class="fa-solid fa-magnifying-glass search-icon"></i>
        <input
          v-model="searchQuery"
          @keyup.enter="performSearch"
          class="search-input"
          type="text"
          placeholder="Search"
        />
      </div>
      
      <div class="user-actions" v-if="isAuthenticated">
        <div @click="navigateToProfile" class="avatar-wrapper">
          <img class="avatar" :src="userAvatar" />
        </div>
        <div @click="handleLogout" class="logout-button">
          <i class="fa fa-sign-out" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  background-color: #232223;
  height: 49px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  border-bottom: $border;
}

.header-container {
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: 1106px;
  width: 100%;
  padding: 0 15px;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.logo-wrapper:active {
  opacity: 0.7;
}

.logo {
  width: 30px;
  height: 30px;
  filter: brightness(1.15);
}

.search-container {
  width: 210px;
  display: flex;
  align-items: center;
  border-radius: 7.5px;
  background-color: #424343;
  height: 32px;
  margin-left: 120px;
}

.search-icon {
  color: #868686;
  font-size: 14px;
  margin-left: 12px;
}

.search-input {
  width: 100%;
  background: transparent;
  border: none;
  font-size: 14px;
  color: $color-text-primary;
  outline: none;
  padding-right: 10px;
  margin-left: 7.5px;
}
.search-input::placeholder {
  font-size: 14px;
  color: $color-text-muted;
}

.user-actions {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.avatar-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
}
.avatar-wrapper:active {
  opacity: 0.7;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.logout-button {
  @include button-mixin($color-grey-light, $color-text-primary, 32px, 32px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logout-button i {
  font-size: 14px;
}

.logout-button:hover {
  background-color: #9b0000b2;
}

.logout-button:active {
  opacity: 0.7;
}
</style>