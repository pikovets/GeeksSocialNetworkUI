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
      <div @click="toggleLike" :class="[{ liked: isLiked }, 'like-btn']">
        <img :src="getLikeImage" class="like-icon" />
        <p class="likes-amount">
          {{ likesAmount }}
        </p>
      </div>
    </div>
    <!-- <hr class="post-footer-separator" />
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
    </div> -->
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
  emits: ['delete-post'],
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
  },
  data() {
    return {
      isLiked: this.post.likes.some(
        (like) => like.user.id === this.authUser.id
      ),
      likesAmount: this.post.likes.length,
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
