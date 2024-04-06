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
import activeLike from '../assets/icons/likeActive.svg';
import passiveLike from '../assets/icons/likePassive.svg';
import defaultAvatar from '../assets/img/avatars/default-avatar.jpg';
import { sendComment, toggleLike, deleteComment } from '../services/api';
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

<style scoped src="../assets/styles/Post.css"></style>
