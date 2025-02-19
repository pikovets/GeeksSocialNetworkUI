<script>
import passiveLike from '../../assets/icons/likePassive.svg';
import activeLike from '../../assets/icons/likeActive.svg';
import {toggleCommentLike} from '../../services/api';
import defaultAvatar from '../../assets/img/avatars/default-avatar.jpg';

export default {
  props: {
    comment: Object,
    authUser: Object,
  },
  computed: {
    getLikeImage() {
      return this.isLiked ? activeLike : passiveLike;
    },
    getAvatar() {
      return this.comment.author.photoLink
          ? this.comment.author.photoLink
          : defaultAvatar;
    },
  },
  emits: ['delete-comment'],
  data() {
    return {
      isLiked:
          this.comment.likes &&
          this.comment.likes.some((like) => like.user.id === this.authUser.id),
      likesAmount: this.comment.likes ? this.comment.likes.length : 0,
    };
  },
  methods: {
    getCommentDate() {
      const date = new Date(this.comment.date);
      const day = date.getDate();
      const month = date.toLocaleString('default', {month: 'short'});
      const hour = date.getHours();
      const minute = date.getMinutes();
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      const period = hour < 12 ? 'am' : 'pm';
      return `${day} ${month} at ${formattedHour}:${
          minute < 10 ? '0' : ''
      }${minute} ${period}`;
    },
    async toggleCommentLike() {
      const response = await toggleCommentLike(this.comment.id);

      if (response.ok) {
        this.isLiked = !this.isLiked;
        this.likesAmount = this.isLiked
            ? this.likesAmount + 1
            : this.likesAmount - 1;
      }
    },
  },
};
</script>

<template>
  <div class="comment">
    <div class="comment-author-image-container">
      <img :src="getAvatar" class="comment-author-image"/>
    </div>
    <div class="comment-content">
      <p class="comment-author-name">
        {{ this.comment.author.firstName + ' ' + this.comment.author.lastName }}
      </p>
      <p class="comment-text">
        {{ comment.text }}
      </p>
      <div class="interaction-section">
        <p class="published-date">{{ getCommentDate() }}</p>
        <p
            v-show="authUser.id === comment.author.id && comment.id"
            @click="$emit('delete-comment', this.comment.id)"
            class="delete-btn"
        >
          {{ $t('delete') }}
        </p>
        <img
            v-show="comment.id"
            @click="toggleCommentLike"
            :src="getLikeImage"
            class="like-btn"
        />
        <p v-show="comment.id" class="comment-likes-amount">
          {{ likesAmount }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.comment {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
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
  flex: 1;
}

.comment-author-name {
  font-weight: bold;
  font-size: 12.5px;
  color: $color-text-primary;
}

.comment-text {
  font-size: 13px;
  color: $color-text-primary;
  margin-top: 2.5px;
  margin-bottom: 2.5px;
}

.published-date {
  color: #818181;
  font-size: 12px;
  justify-content: start;
}

.interaction-section {
  display: flex;
  flex: 1;
  align-items: center;
}

.reply-btn {
  font-size: 12.5px;
  margin-left: 10px;
  color: rgb(84, 161, 72);
  cursor: pointer;
}

.reply-btn:hover {
  text-decoration: underline;
}

.comment-likes-amount {
  color: #818181;
  justify-items: end;
  margin-left: 5px;
  font-size: 13.5px;
}

.like-btn {
  width: 17.5px;
  height: 17.5px;
  cursor: pointer;
  margin-left: auto;
}

.delete-btn {
  font-size: 12.5px;
  margin-left: 10px;
  color: #ca3131;
  cursor: pointer;
}

.delete-btn:hover {
  text-decoration: underline;
}

</style>
