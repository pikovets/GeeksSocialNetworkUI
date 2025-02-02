<template>
  <div class="add-post-container">
    <div class="text-content">
      <img :src="getAvatar" class="profile-image" />
      <input
        v-model="postText"
        class="add-post-text-input"
        type="text"
        :placeholder="`What's new ${this.authUser.firstName}?`"
        @keyup.enter="sendPost"
      />

      <div
        @click="sendPost"
        :class="[!isPostValid ? 'passive-btn' : '', 'send-btn']"
      >
        <i class="fa fa-paper-plane filter-green" aria-hidden="true"></i>
      </div>
    </div>

    <hr class="separator" />
    <div class="extra-content-buttons">
      <div
        @click="isAddPhotoActive = !isAddPhotoActive"
        :class="[isAddPhotoActive ? 'active-photo-btn' : '', 'photo-btn']"
      >
        <img src="../assets/icons/photo.svg" class="photo-icon filter-grey" />
        <p class="photo-text">Add photo</p>
      </div>

      <div v-if="isAddPhotoActive" class="photo-url-container">
        <input
          v-model="photoLink"
          type="text"
          placeholder="Photo URL: "
          class="photo-url-input"
        />
      </div>
    </div>
    <div
      v-if="(!isPhotoUrlValid && !isPhotoUrlEmpty) || !isPostTextValid"
      class="validation-container"
    >
      <div v-if="!isPostTextValid" class="post-text-validation-container">
        <div class="error-icon-background">
          <img
            src="../assets/icons/warning.svg"
            class="warning-icon filter-green"
          />
        </div>
        <p>
          <span style="color: #54a148">Warning:</span>
          {{ $t('postTextValidationMsg') }}
        </p>
      </div>
      <div
        v-if="!isPhotoUrlValid && !isPhotoUrlEmpty"
        class="post-image-url-validation-container"
      >
        <div class="error-icon-background">
          <img
            src="../assets/icons/warning.svg"
            class="warning-icon filter-green"
          />
        </div>
        <p>
          <span style="color: #54a148">Error:</span>
          {{ $t('photoLinkValidationMsg') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import defaultAvatar from '../assets/img/avatars/default-avatar.jpg';
import { validationRules } from '../config/validationRules';
import { uploadPost } from '../services/api';

export default {
  name: 'AddPost',
  props: {
    authUser: Object,
  },
  data() {
    return {
      isAddPhotoActive: false,
      postText: '',
      photoLink: '',
      validationRules: validationRules,
    };
  },
  computed: {
    getAvatar() {
      return this.authUser.photoLink ? this.authUser.photoLink : defaultAvatar;
    },
    isPostTextValid() {
      return this.postText !== '' && this.postText.length <= 2200;
    },
    isPhotoUrlEmpty() {
      return this.photoLink === '';
    },
    isPostValid() {
      return this.isPostTextValid && (this.isPhotoUrlValid || this.isPhotoUrlEmpty);
    },
    isPhotoUrlValid() {
      return (
        this.isAddPhotoActive &&
        this.validationRules.photoLink.test(this.photoLink)
      );
    },
  },
  methods: {
    async sendPost() {
      if (this.isPostValid) {
        await uploadPost({
          text: this.postText,
          photoLink: this.photoLink,
        });

        this.$router.go();
      }
    },
  },
};
</script>

<style scoped src="../assets/styles/AddPost.css"></style>
