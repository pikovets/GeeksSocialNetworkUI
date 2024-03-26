<template>
  <header>
    <div class="container">
      <div @click="goToHomePage" class="logo-section">
        <img src="../assets/img/logo.png" class="logo" />
      </div>

      <div class="search-box" v-show="isRegistered">
        <i class="fa-solid fa-magnifying-glass search-icon"></i>
        <input
          v-model="searchName"
          v-on:keyup.enter="onSearch"
          class="search-bar"
          type="text"
          placeholder="Search"
        />
      </div>
      <div class="extra-buttons-container">
        <div
          @click="goToProfilePage"
          class="profile-image-container"
          v-show="isRegistered"
        >
          <img class="profile-image" :src="getAvatar" />
        </div>
        <div @click="logout" class="logout-btn" v-show="isRegistered">
          <i class="fa fa-sign-out" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import DefaultAvatar from '../assets/img/avatars/default-avatar.jpg';

export default {
  props: {
    authUser: Object,
  },
  data() {
    return {
      isRegistered: localStorage.getItem('GeeksJwtToken'),
      searchName: '',
    };
  },
  computed: {
    getAvatar() {
      return this.authUser && this.authUser.photoLink
        ? this.authUser.photoLink
        : DefaultAvatar;
    },
  },
  methods: {
    goToHomePage() {
      this.$router.push({ name: 'home' });
    },
    goToProfilePage() {
      this.$router.push({ name: 'profile', params: { id: 'me' } });
    },
    logout() {
      localStorage.removeItem('GeeksJwtToken');
      this.$router.push({ name: 'login' });
    },
    onSearch() {
      if (this.searchName === '') return;

      this.$router.push({
        name: 'search',
        query: { searchName: this.searchName.replace(/\s/g, '') },
      });
    },
  },
};
</script>

<style scoped>
header {
  background-color: #232223;
  height: 49px;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  display: flex;
  flex-direction: row;

  border-bottom: 1px solid #474a4d3f;
}

.container {
  display: flex;
  flex-direction: row;
  align-items: center;

  margin: 0 auto 0 auto;
  max-width: 1000px;
  width: 100%;
}

.logo-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.logo-section:active {
  opacity: 0.7;
}

.logo {
  width: 30px;
  height: 30px;
  filter: brightness(1.15);
}

.search-box {
  width: 210px;
  display: flex;
  flex-direction: row;
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

.search-bar {
  width: 100%;
  background-color: #42434300;
  border-style: none;
  font-size: 14px;
  color: rgb(219, 219, 219);
  outline: none;
  padding-right: 10px;
  margin-left: 7.5px;
}
.search-bar::placeholder {
  font-size: 14px;
  color: rgb(136, 136, 136);
}

.extra-buttons-container {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;

  justify-content: flex-end;
}

.profile-image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
}
.profile-image-container:active {
  opacity: 0.7;
}

.profile-image {
  width: 32px;
  height: 32px;
  border-radius: 50px;
  object-fit: cover;
  object-position: center;
}

.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  cursor: pointer;
  background-color: #424343;
}

.logout-btn i {
  color: #ffffff;
  font-size: 14px;
}

.logout-btn:hover {
  background-color: #d40101ad;
}

.logout-btn:active {
  opacity: 0.7;
}
</style>
