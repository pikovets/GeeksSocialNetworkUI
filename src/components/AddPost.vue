<script>
import defaultAvatar from '../assets/img/avatars/default-avatar.jpg';
import {validationRules} from '../config/validationRules';

import {uploadCommunityPost, uploadUserPost} from '../services/api';
import GlowInput from "@/components/elements/GlowInput.vue";

export default {
  name: 'AddPost',
  components: {GlowInput},
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
        if (this.community) {
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

<template>
  <div class="add-post-container">
    <div class="text-content">
      <img :src="getAvatar" class="profile-image"/>
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

    <hr class="separator"/>
    <div class="add-photo-container">
      <div
          @click="isAddPhotoActive = !isAddPhotoActive"
          :class="[isAddPhotoActive ? 'active-photo-btn' : '', 'photo-btn']"
      >
        <img src="../assets/icons/photo.svg" class="photo-icon filter-grey"/>
        <p class="photo-text">Add photo</p>
      </div>

      <div v-if="isAddPhotoActive" class="photo-url-container">
        <GlowInput v-model="photoLink"
                   :label="$t('photoLinkLabel')"
                   :validationRule="validationRules.photoLink"
                   :show-error-msg="false"></GlowInput>
      </div>
    </div>
    <div
        v-if="(!isPhotoUrlValid && !isPhotoUrlEmpty) || !isPostTextValid"
        class="validation-container"
    >
<!--      <div v-if="!isPostTextValid" class="post-text-validation-container">-->
<!--        <div class="error-icon-background">-->
<!--          <img-->
<!--              src="../assets/icons/warning.svg"-->
<!--              class="warning-icon filter-green"-->
<!--          />-->
<!--        </div>-->
<!--        <p>-->
<!--          <span style="color: #ffc600; font-weight: bold">Warning:</span>-->
<!--          {{ $t('postTextValidationMsg') }}-->
<!--        </p>-->
<!--      </div>-->
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
          <span style="color: #cc3300; font-weight: bold">Error:</span>
          {{ $t('photoLinkValidationMsg') }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
p {
  color: $color-text-muted;
}

.text-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
}

.add-post-container {
  @include transperent-panel-mixin;
  max-width: 550px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  border: $border;
  padding: 0.75em 1.25em 0.75em 1.25em;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin: 0 auto 15px;
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
  color: $color-text-primary;
  padding: 0 15px;
}

.add-post-text-input::placeholder {
  font-size: 13px;
  color: $color-text-muted;
}

.send-btn {
  @include button-mixin(#333333, white, 35px, 35px);
}

.send-btn i {
  font-size: 14px;
}

.passive-btn {
  opacity: 0.5;
  pointer-events: none;
}

.separator {
  margin: 2.5% 0 3% 0;
}

.add-photo-container {
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
  margin-left: 15px;
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
