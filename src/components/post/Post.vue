<template>
  <div class="post">
    <div class="header">
      <div class="profile-image-container">
        <img @click="goToAuthorPage" class="profile-image" :src="getAvatar" />
      </div>
      <div class="metadata-container">
        <p @click="goToAuthorPage" class="author-name">{{ fullName }}</p>
        <p class="published-date">{{ getPostDate }}</p>
      </div>
      <div v-show="post.author.id === authUser.id" class="interaction-buttons">
        <div @click="$emit('delete-post', this.post.id)" class="delete-btn">
          <i class="fa-solid fa-trash" style="margin-right: 0"></i>
        </div>
      </div>
    </div>
    <div class="post-content">
      <p class="post-text">{{ post.text }}</p>
      <img v-show="post.photoLink" class="post-media" :src="post.photoLink" />
    </div>
    <div class="post-footer">
      <div @click="toggleLike" :class="[{ liked: isLiked }, 'post-btn']">
        <img :src="getLikeImage" class="like-icon" />
        <p class="likes-amount">
          {{ likesAmount }}
        </p>
      </div>
      <div @click="focusCommentInput" class="post-btn">
        <img src="../../assets/icons/comment.svg" class="comment-icon" />
        <p class="comments-amount">
          {{ commentsAmount }}
        </p>
      </div>
    </div>
    <hr class="post-footer-separator" />
    <Comments
      v-if="post.comments.length > 0"
      :comments="sortedComments"
      :authUser="authUser"
      @delete-comment="deleteComment"
    />
    <div class="my-comment">
      <div class="comment-author-image-container">
        <img
          :src="getAvatar"
          class="comment-author-image"
        />  
      </div>
      <div class="my-comment-content">
        <input
          ref="commentInput"
          class="comment-input"
          type="text"
          placeholder="Add a comment..."
        />
        <img
          @click="sendComment"
          src="../../assets/icons/activeSend.svg"
          class="send-comment-icon"
        />
      </div>
    </div>
  </div>
</template>

<script>
import activeLike from '../../assets/icons/likeActive.svg';
import passiveLike from '../../assets/icons/likePassive.svg';
import defaultAvatar from '../../assets/img/avatars/default-avatar.jpg';
import { sendComment, toggleLike, deleteComment } from '../../services/api';
import Comments from './Comments.vue';

export default {
  props: {
    post: Object,
    authUser: Object,
  },
  components: {
    Comments,
  },
  emits: ['delete-post', 'update-post'],
  computed: {
    fullName() {
      return `${this.post.author.firstName} ${this.post.author.lastName}`;
    },
    getAvatar() {
      return this.post.author.photoLink
        ? this.post.author.photoLink
        : defaultAvatar;
    },
    getPostDate() {
      const date = new Date(this.post.date);
      return `${date.getDate()} ${date.toLocaleString('default', {
        month: 'short',
      })} at ${date.getHours()}:${date.getMinutes()}`;
    },
    getLikeImage() {
      return this.isLiked ? activeLike : passiveLike;
    },
    getMostLikedComment() {
      return this.post.comments.filter;
    },
    sortedComments() {
      return this.post.comments
        ? this.post.comments.slice().sort((a, b) => {
            if (a.likes && b.likes) {
              if (b.likes.length !== a.likes.length) {
                return b.likes.length - a.likes.length;
              } else {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
              }
            } else if (a.likes && !b.likes) {
              return -1;
            } else if (!a.likes && b.likes) {
              return 1;
            } else {
              const dateA = new Date(a.date);
              const dateB = new Date(b.date);
              return dateB - dateA;
            }
          })
        : [];
    },
  },
  data() {
    return {
      isLiked: this.post.likes.some(
        (like) => like.user.id === this.authUser.id
      ),

      likesAmount: this.post.likes.length,
      commentsAmount: this.post.comments.length,
    };
  },
  methods: {
    async toggleLike() {
      const response = await toggleLike(this.post.id);

      if (response.ok) {
        this.isLiked = !this.isLiked;
        this.likesAmount = this.isLiked
          ? this.likesAmount + 1
          : this.likesAmount - 1;
      }
    },
    async sendComment() {
      if (this.$refs.commentInput.value.trim() === '') {
        return;
      }

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();

      const response = await sendComment(this.post.id, {
        text: this.$refs.commentInput.value.trim(),
        author: this.authUser,
      });

      if (response.ok) {
        const newComment = {
          text: this.$refs.commentInput.value.trim(),
          author: this.authUser,
          date: formattedDate,
        };
        this.post.comments.push(newComment);

        this.commentsAmount++;

        this.$refs.commentInput.value = '';
      }
    },
    async deleteComment(commentId) {
      const response = await deleteComment(commentId);

      if (response.ok) {
        this.post.comments = this.post.comments.filter(
          (comment) => comment.id !== commentId
        );
        this.commentsAmount--;

        this.$emit('update-post');
      }
    },
    goToAuthorPage() {
      this.$router.push({
        name: 'profile',
        params: { id: this.post.author.id },
      });
    },
    focusCommentInput() {
      this.$refs.commentInput.focus();
    },
  },
};
</script>

<style scoped>
.post {
  width: 550px;
  background: rgba(36, 36, 36, 0.8);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 12px;
  border: 1px solid #8383833f;
  margin: 0 auto;
  padding: 15px 20px;
  margin-bottom: 15px;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
}

.profile-image-container {
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: opacity 0.1s;
  margin-right: 12.5px;
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
  color: #54a148;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 3.5px;
  cursor: pointer;
}
.author-name:hover {
  text-decoration: underline;
}

.interaction-buttons {
  display: flex;
  gap: 10px;
}
.interaction-buttons i {
  font-size: 16px;
  color: rgb(201, 201, 201);
}

.interaction-buttons div {
  background-color: #323233;
  padding: 9px 10px 9px 10px;
  border-radius: 10px;
  cursor: pointer;
}
.interaction-buttons div:hover {
  background-color: #414141;
}
.interaction-buttons div:active {
  background-color: rgb(48, 48, 49);
}

.post-content {
  margin-bottom: 15px;
}
.published-date {
  display: block;
  color: #818181;
  font-size: 12px;
}

.post-text {
  display: block;
  color: rgb(225, 227, 230);
  font-size: 13px;
  margin-bottom: 10px;
}

.post-media {
  display: block;
  width: 550px;
  height: 550px;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
  border: 1px solid #4b4b4b3f;
}

.post-interaction {
  padding: 0 10px;
}

.post-footer {
  display: flex;
  align-items: center;
}

.post-btn {
  background-color: #323233;
  border-style: none;
  border-radius: 20px;
  height: 32px;
  padding: 0 10px;
  cursor: pointer;
  margin-right: 1.75%;

  display: inline-flex;
  flex-direction: row;
  align-items: center;
}

.liked {
  background-color: rgba(66, 41, 42, 255);
}

.liked p {
  color: rgba(225, 85, 84, 255);
}

.like-icon {
  width: 24px;
  height: 24px;
  margin-right: 5px;
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

.send-comment-icon {
  cursor: pointer;
}
</style>
