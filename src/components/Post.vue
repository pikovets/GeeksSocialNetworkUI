<template>
  <div class="post">
    <div class="header">
      <div class="profile-image-container">
        <img class="profile-image" src="../assets/img/avatars/griffith.png" />
      </div>
      <div class="metadata-container">
        <p class="author-name">griffith</p>
        <p class="published-date">21 Nov at 2:07 pm</p>
      </div>
    </div>
    <img class="post-media" src="../assets/img/posts/griffith_post_1.jpg" />
    <!-- <div class="post-interaction">
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
    </div> -->
    <div class="post-footer">
      <div class="like-btn">
        <img src="../assets/icons/like.svg" class="like-icon" />
        <p class="likes-amount">151</p>
      </div>
      <div class="comment-btn">
        <img src="../assets/icons/comment.svg" class="comment-icon" />
        <p class="comments-amount">22</p>
      </div>
    </div>
    <hr class="post-footer-separator" />
    <div class="comment">
      <div class="comment-author-image-container">
        <img
          src="../assets/img/avatars/berserk.jpg"
          class="comment-author-image"
        />
      </div>
      <div class="comment-content">
        <p class="comment-author-name">Guts</p>
        <p class="comment-text">
          I don't know, but I'm sure that I will find out
        </p>
        <p class="published-date">21 Nov at 3:05 pm</p>
      </div>
    </div>
    <p class="show-more-comments">Show more comments</p>
    <div class="my-comment">
      <div class="comment-author-image-container">
        <img
          src="../assets/img/avatars/berserk.jpg"
          class="comment-author-image"
        />
      </div>
      <div class="my-comment-content">
        <input
          class="comment-input"
          type="text"
          placeholder="Add a comment..."
        />
        <button class="post-comment-btn">
          <img src="../assets/icons/send.svg" class="post-comment-icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post {
  width: 550px;
  height: 850px;
  background-color: #242526;
  border-radius: 15px;
  border: 1px solid #8383833f;
  margin: 0 auto;
  margin-top: 15px;
  padding: 0.75% 1%;
  position: relative;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1.5%;
}

.profile-image-container {
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: opacity 0.1s;
  margin-right: 2.5%;
}
.profile-image-container:hover {
  opacity: 0.8;
}

.profile-image {
  width: 40px;
  height: 40px;
  border-radius: 50px;
  object-fit: cover;
  object-position: center;
}

.metadata-container {
  flex: 1;
}

.author-name {
  display: block;
  color: #63be55;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 1%;
}

.published-date {
  display: block;
  color: #818181;
  font-size: 12px;
}

.post-media {
  display: block;
  width: 550px;
  height: 550px;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
  border: 1px solid #4b4b4b3f;
  margin-bottom: 2%;
}

.post-interaction {
  padding: 0 10px;
}

.post-footer {
  display: flex;
  align-items: center;
}

.like-btn {
  background-color: #323233;
  border-style: none;
  border-radius: 20px;
  padding: 0.9% 3% 0.9% 2.3%;
  cursor: pointer;
  margin-right: 1.75%;

  display: inline-flex;
  flex-direction: row;
  align-items: center;
}

.like-icon {
  width: 24px;
  height: 24px;
  margin-right: 8%;
}

.likes-amount {
  color: #7d7e81;
  font-weight: bold;
  font-size: 13px;
}

.comment-btn {
  background-color: #323233;
  border-style: none;
  border-radius: 20px;
  padding: 0.9% 3% 0.9% 2.3%;

  display: inline-flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}
.comment-btn:hover {
  background-color: rgb(54, 54, 54);
}

.comment-icon {
  width: 24px;
  height: 24px;
  margin-right: 7.5px;
}

.comments-amount {
  color: #7d7e81;
  font-weight: bold;
  font-size: 13px;
}

.post-footer-separator {
  background-color: #8383833f;
  height: 1px;
  border-style: none;
  width: 550px;
  margin: 2.5% 0 3% -4%;
}

.comment {
  display: flex;
  flex-direction: row;
  align-items: top;
}

.comment-author-image-container {
  width: 32px;
  height: 32px;
  cursor: pointer;
  margin-right: 2%;
}

.comment-author-image {
  width: 32px;
  height: 32px;
  border-radius: 50px;
  object-fit: cover;
  object-position: center;
}

.comment-content {
  display: flex;
  flex-direction: column;
  line-height: 1.4;
}

.comment-author-name {
  font-weight: 500;
  font-size: 14px;
}

.comment-text {
  font-size: 13px;
  color: rgb(219, 219, 219);
}

.show-more-comments {
  color: #63be55;
  font-weight: 500;
  font-size: 13px;
  cursor: pointer;
  margin-top: 3%;
  margin-bottom: 4%;
}

.my-comment {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.my-comment-content {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.comment-input {
  flex: 1;
  border: 1px solid #b4b4b43f;
  background-color: transparent;
  font-size: 13px;
  color: rgb(219, 219, 219);
  padding: 2%;
  border-radius: 5px;
  margin-right: 5%;
}

.post-comment-btn {
  background-color: transparent;
  border-style: none;
  cursor: pointer;
  opacity: 0.3;
}
</style>
