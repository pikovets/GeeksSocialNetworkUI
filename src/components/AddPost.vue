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

import { uploadCommunityPost, uploadUserPost } from '../services/api';

export default {
  name: 'AddPost',
  props: {
    authUser: Object,
    community: Object,
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
      return (
        this.isPostTextValid && (this.isPhotoUrlValid || this.isPhotoUrlEmpty)
      );
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
        if (this.community !== null) {
          await uploadCommunityPost(
            {
              text: this.postText,
              photoLink: this.photoLink,
            },
            this.community.id
          );
        } else {
          await uploadUserPost({
            text: this.postText,
            photoLink: this.photoLink,
          });
        }

        this.$router.go();
      }
    },
  },
};
</script>

<style scoped>
p {
  color: #8c8e8f;
}

.text-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
}

.add-post-container {
  max-width: 550px;
  background: rgba(36, 36, 36, 0.8);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 12px;
  border: 1px solid #8383833f;
  margin: 0 auto;
  padding: 0.75em 1.25em 0.75em 1.25em;

  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-bottom: 15px;
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
  padding: 0 15px;
  transition: opacity 0.1s;
}

.add-post-text-input::placeholder {
  font-size: 13px;
  color: rgb(125, 125, 125);
}

.send-btn {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 35px;
  height: 35px;
  border-radius: 10px;
  background-color: #333333;
  margin-left: 0.5em;
  cursor: pointer;
  transition: opacity 0.1s;
}
.send-btn:hover {
  opacity: 0.7;
}
.send-btn:active {
  opacity: 0.5;
}

.send-btn i {
  color: #a1a1a1;
  font-size: 14px;
}

.passive-btn {
  opacity: 0.5;
  pointer-events: none;
}

.separator {
  background-color: #8383833f;
  height: 1px;
  border-style: none;
  width: 100%;
  margin: 2.5% 0 3% 0;
}

.extra-content-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.photo-btn {
  display: flex;
  flex-direction: row;
  align-items: center;

  border: 2px solid #9b9b9b3f;
  border-radius: 5px;
  padding: 5px 5px 5px 5px;
  cursor: pointer;
}
.photo-btn:hover {
  border: 2px solid #4d4d4d;
  background-color: #6464643f;
  user-select: none;
}
.photo-btn:active {
  opacity: 0.7;
}

.photo-icon {
  width: 22px;
  height: 22px;
  cursor: pointer;
}

.photo-text {
  margin-left: 5px;
  font-size: 14px;
}

.active-photo-btn {
  border: 2px solid #0b6d0b9c !important;
  background-color: #3b3b3b7a !important;
}

.photo-url-container {
  background-color: #242526;
  margin-left: 15px;
}

.photo-url-input {
  border-style: none;
  background-color: rgba(56, 56, 56, 0.308);
  padding: 7px 5px;
  border-radius: 5px;
  font-size: 14px;
  color: rgb(216, 216, 216);
  outline: none;
  transition: opacity 0.1s;
}

.photo-invalid-error {
  color: #ff0000a8;
  font-size: 12px;
  margin-top: 5px;
  margin-left: 5px;
}

.validation-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  margin-top: 15px;
}

.validation-container div {
  display: flex;
  align-items: center;
}

.validation-container p {
  font-size: 14px;
  color: #cacaca;
}

.error-icon-background {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 35px;
  height: 35px;
  border-radius: 10px;
  background-color: rgb(14, 14, 14);
  transition: opacity 0.1s;
  margin-right: 5px;
}

.warning-icon {
  width: 22px;
  height: 22px;
}

.post-text-validation-container {
  margin-bottom: 15px;
}
</style>
