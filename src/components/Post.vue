<template>
  <div class="post">
    <div class="header">
      <div class="profile-image-container">
        <img class="profile-image" src="../assets/img/avatars/griffith.png" />
      </div>
      <div class="metadata-container">
        <p class="author-name">griffith</p>
        <p class="published-date">1 d.</p>
      </div>
    </div>
    <img class="post-media" src="../assets/img/posts/griffith_post_1.jpg" />
    <div class="post-interaction">
      <div class="interaction-buttons">
        <button class="like-btn">
          <img class="like-image" src="../assets/icons/like.svg" />
        </button>
        <button class="comment-btn">
          <img class="comment-image" src="../assets/icons/comment.svg" />
        </button>
      </div>
      <p class="likes-amount">2,423 likes</p>
      <div class="post-text-container">
        <p class="author-name" style="display: inline-block; margin-right: 5px">
          griffith
        </p>
        <p class="post-text" style="display: inline-block">
          What is the fate of mankind in this world?
        </p>
      </div>
      <p class="comments-amount">View all 69 comments</p>
    </div>
  </div>
</template>

<style scoped>
.post {
  width: 550px;
  height: 750px;
  background-color: #242526;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 25px;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.profile-image-container {
  width: 35px;
  height: 35px;
  margin: 15px 15px 15px 15px;
  cursor: pointer;
  transition: opacity 0.1s;
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

.metadata-container {
  flex: 1;
}

.author-name {
  display: block;
  color: #b0b3b8;
  font-size: 14px;
  font-weight: bold;
}

.published-date {
  display: block;
  color: #818181;
  font-size: 14px;
}

.post-media {
  display: block;
  width: 550px;
  height: 550px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 10px;
}

.post-interaction {
  padding: 0 10px;
}

.interaction-buttons {
  display: grid;
  grid-template-columns: 30px 30px;
  column-gap: 10px;
  margin-bottom: 10px;
}

.like-btn {
  background-color: #242526;
  border-style: none;
  padding: 0px;
}
.like-btn:hover {
  opacity: 0.6;
}

.like-image {
  width: 24px;
  height: 24px;
}

.comment-btn {
  background-color: #242526;
  border-style: none;
  padding: 0px;
}
.comment-btn:hover {
  opacity: 0.6;
}

.comment-image {
  width: 24px;
  height: 24px;
}

.likes-amount {
  color: #b0b3b8;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 10px;
}

.post-text {
  color: rgb(168, 168, 168);
  font-size: 14px;
  margin-bottom: 20px;
}

.comments-amount {
  color: #707275;
  font-size: 14px;
  cursor: pointer;
}

</style>