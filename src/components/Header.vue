<template>
  <header>
    <div class="container">
      <div class="logo-section">
        <img src="../assets/img/logo.png" class="logo" />
      </div>

      <div class="search-box" v-show="isRegistered">
        <i class="fa-solid fa-magnifying-glass search-icon"></i>
        <input class="search-bar" type="text" placeholder="Search" />
      </div>
      <div class="extra-buttons-container">
        <div class="profile-image-container" v-show="isRegistered">
          <img class="profile-image" src="../assets/img/avatars/berserk.jpg" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isRegistered: localStorage.getItem('GeeksJwtToken'),
    };
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
.logo-section:hover {
  opacity: 0.8;
  transform: scale(1.05);
  transition: 0.05s ease-in-out;
}
.logo-section:active {
  opacity: 0.7;
  transform: scale(0.975);
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
  margin-right: 10px;
  cursor: pointer;
}
.profile-image-container:hover {
  opacity: 0.8;
  transform: scale(1.05);
  transition: 0.05s ease-in-out;
}
.profile-image-container:active {
  opacity: 0.7;
  transform: scale(0.975);
}

.profile-image {
  width: 32px;
  height: 32px;
  border-radius: 50px;
  object-fit: cover;
  object-position: center;
}
</style>
