<template>
  <div class="post">
    <div class="header">
      <div class="profile-image-container">
        <img @click="goToAuthorPage" class="profile-image" :src="getAvatar" />
        <img @click="goToAuthorPage" class="profile-image" :src="getAvatar" />
      </div>
      <div class="metadata-container">
        <p @click="goToAuthorPage" class="author-name">{{ fullName }}</p>
        <p @click="goToAuthorPage" class="author-name">{{ fullName }}</p>
        <p class="published-date">{{ getPostDate }}</p>
      </div>
      <div v-show="post.author.id === authUser.id" class="interaction-buttons">
        <div @click="$emit('delete-post', this.post.id)" class="delete-btn">
          <i class="fa-solid fa-trash" style="margin-right: 0"></i>
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
        <img src="../assets/icons/comment.svg" class="comment-icon" />
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
          src="../assets/img/avatars/berserk.jpg"
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
          src="../assets/icons/activeSend.svg"
          class="send-comment-icon"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { toggleLike } from '../services/api';
import defaultAvatar from '../assets/img/avatars/default-avatar.jpg';
import passiveLike from '../assets/icons/likePassive.svg';
import activeLike from '../assets/icons/likeActive.svg';

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
        this.likesAmount = this.isLiked
          ? this.likesAmount + 1
          : this.likesAmount - 1;
      }
    },
    goToAuthorPage() {
      this.$router.push({
        name: 'profile',
        params: { id: this.post.author.id },
      });
    },
  },
};
</script>

<style scoped src="../assets/styles/Post.css"></style>
