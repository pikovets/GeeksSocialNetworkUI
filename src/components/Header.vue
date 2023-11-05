<template>
  <header>
    <div class="left-section">
      <div class="logo-container">
        <p class="logo">G</p>
      </div>
    </div>

    <div class="right-section">
      <div class="search-box">
        <img class="search-icon" src="../assets/icons/search.svg" />
        <input class="search-bar" type="text" placeholder="Search" />
      </div>
      <div class="extra-buttons-container">
        <div class="profile-image-container">
          <img class="profile-image" src="../assets/img/avatars/berserk.jpg" />
        </div>
        <div class="chat-container">
          <img class="chat-image" src="../assets/icons/chat.svg" />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  background-color: #242526;
  height: 57px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.left-section {
  margin: 0px 0px 0px 1%;
  align-items: center;
}

.logo-container {
  background-color: rgba(77, 77, 77, 0.4);
  width: 46px;
  height: 46px;
  border-style: none;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.logo-container:hover {
  opacity: 0.8;
}

.logo {
  font-size: 250%;
  font-family: 'Saira Stencil One', sans-serif;
  color: #48883e;
  opacity: 1;
  margin: 2px 0px 0px -1px;
}

.right-section {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0px 0px 0px 75%;
}

.search-box {
  width: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-style: solid;
  border-radius: 10px;
  border-color: #424242;
  border-width: 1px;
  height: 36px;
  margin-right: 25px;
}

.search-icon {
  margin-left: 10px;
  width: 18px;
  height: 18px;
  object-fit: cover;
}

.search-bar {
  width: 100%;
  background-color: #242526;
  border-style: none;
  margin-left: 5px;
  font-size: 16px;
  color: rgb(238, 238, 238);
  outline: none;
  padding-right: 10px;
}
.search-bar::placeholder {
  font-size: 16px;
}

.extra-buttons-container {
  flex: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.profile-image-container {
  border-style: solid;
  border-width: 3px;
  border-radius: 50px;
  border-color: #48883e;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer;
}
.profile-image-container:hover {
  opacity: 0.8;
}

.profile-image {
  width: 35px;
  height: 35px;
  border-radius: 50px;
  object-fit: cover;
  object-position: center;
}

.chat-container {
  width: 40px;
  height: 40px;
  background-color: rgba(77, 77, 77, 0.4);
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.chat-container:hover {
  opacity: 0.8;
}

.chat-image {
  width: 22px;
  height: 22px;
  object-fit: cover;
  object-position: center;
}
</style>
