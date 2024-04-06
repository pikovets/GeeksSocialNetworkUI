<template>
  <div class="panel">
    <div v-if="!showMore">
      <Comment
        @delete-comment="deleteComment"
        :comment="comments[0]"
        :authUser="authUser"
      />
    </div>
    <div v-else>
      <div v-for="comment in comments">
        <Comment
          @delete-comment="deleteComment"
          :comment="comment"
          :authUser="authUser"
        />
      </div>
    </div>
    <span
      v-show="comments.length > 1"
      class="show-more-comments"
      @click="toggleShowMoreComments"
    >
      {{ showMoreText }}
    </span>
  </div>
</template>

<script>
import Comment from './Comment.vue';

export default {
  props: {
    authUser: Object,
    comments: Array,
  },
  components: {
    Comment,
  },
  emits: ['delete-comment'],
  data() {
    return {
      showMore: false,
    };
  },
  computed: {
    showMoreText() {
      return this.showMore ? 'Show less comments' : 'Show more comments';
    },
  },
  methods: {
    toggleShowMoreComments() {
      this.showMore = !this.showMore;
    },
    deleteComment(commentId) {
      const index = this.comments.findIndex(
        (comment) => comment.id === commentId
      );

      if (index !== -1) {
        this.$emit('delete-comment', commentId);
      }
    },
  },
};
</script>

<style scoped src="../assets/styles/Comments.css"></style>
