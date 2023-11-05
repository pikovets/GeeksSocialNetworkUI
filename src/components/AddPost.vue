<script></script>

<template>
  <div class="add-post-container">
    <div class="add-post-text-container">
      <div class="profile-image-container">
        <img class="profile-image" src="../assets/img/avatars/berserk.jpg" />
      </div>
      <input
        class="add-post-text-input"
        type="text"
        placeholder="What’s new, Berserk?"
      />
    </div>

    <hr class="add-post-separator" />

    <div class="extra-content-container">
      <div class="media-content-container">
        <img class="media-image" src="../assets/icons/media-content.svg" />
        <p class="media-text">Photo/Video</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.add-post-container {
  width: 550px;
  height: 125px;
  background-color: #242526;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 100px;
}

.add-post-text-container {
  display: flex;
  padding: 15px 15px 0px 15px;
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
}

.profile-image {
  width: 35px;
  height: 35px;
  border-radius: 50px;
  object-fit: cover;
  object-position: center;
}

.add-post-text-input {
  flex: 1;
  border-style: solid;
  border-radius: 10px;
  border-color: #424242;
  border-width: 1px;
  height: 36px;
  background-color: #3a3b3c;
  font-size: 16px;
  color: rgb(238, 238, 238);
  outline: none;
  padding-left: 15px;
  transition: opacity 0.1s;
}
.add-post-text-input:hover {
  opacity: 0.8;
}

.add-post-text-input::placeholder {
  font-size: 16px;
}

.add-post-separator {
  border: none;
  width: 95%;
  height: 1px;
  color: #333;
  background-color: #333;
  margin-top: 10px;
}

.extra-content-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
}

.media-content-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 5px;
  margin-left: 15px;
  cursor: pointer;
}
.media-content-container:hover {
  background-color: rgb(255, 255, 255, 0.1);
  height: 45px;
  opacity: 0.8;
  border-radius: 5px;
}

.media-text {
  margin-left: 10px;
  color: #b0b3b8;
  font-weight: bold;
}
</style>
