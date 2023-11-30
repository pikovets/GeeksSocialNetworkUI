<template>
  <div class="add-post-container">
    <img src="../assets/img/avatars/berserk.jpg" class="profile-image" />
    <input
      class="add-post-text-input"
      type="text"
      placeholder="What’s new, Berserk?"
    />
    <img src="../assets/icons/photo.svg" class="photo-icon" />
  </div>
</template>

<style scoped>
.add-post-container {
  max-width: 550px;
  background-color: #242526;
  border: 1px solid #8383833f;
  border-radius: 15px;
  margin: 0 auto;
  margin-top: 62.5px;
  padding: 0.75em 1.25em 0.75em 1.25em;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}

.profile-image {
  width: 1.75em;
  height: 1.75em;
  border-radius: 50px;
  object-fit: cover;
  object-position: center;
}

.add-post-text-input {
  flex: 1;
  border-style: none;
  background-color: rgba(0, 0, 0, 0);
  font-size: 13px;
  color: rgb(238, 238, 238);
  outline: none;
  padding: 0 1.2em;
  transition: opacity 0.1s;
}

.add-post-text-input::placeholder {
  font-size: 13px;
  color: rgb(125, 125, 125);
}

.photo-icon {
  width: 22px;
  height: 22px;
  cursor: pointer;
}
</style>
