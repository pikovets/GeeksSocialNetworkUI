<template>
  <div class="overlay">
    <div class="sections-grid">
      <div class="panel">
        <div class="title-container">
          <p class="title">{{ $t('additionInfo') }}</p>
        </div>
        <hr class="separator" />
        <div class="more-info-content">
          <div v-show="authProfile.bio !== null" class="info-section">
            <img src="../../../assets/icons/bio.svg" />
            <p class="bio">{{ authProfile.bio }}</p>
          </div>
          <hr v-show="authProfile.bio !== null" class="separator" />
          <div class="personal-info">
            <div v-show="authProfile.sex !== null" class="info-section">
              <img
                src="../../../assets/icons/sex.png"
                style="width: 20px; height: 20px"
              />
              <p class="hint-text">{{ $t('sexHint') }}</p>
              <p class="sex">{{ authProfile.sex }}</p>
            </div>
            <div v-show="authProfile.birthday !== null" class="info-section">
              <img src="../../../assets/icons/birthday.svg" />
              <p class="hint-text">{{ $t('birthdayHint') }}</p>
              <p class="birthday">{{ getDate }}</p>
            </div>
            <div v-show="authProfile.address !== null" class="info-section">
              <img src="../../../assets/icons/home.svg" />
              <p class="hint-text">{{ $t('addressHint') }}</p>
              <p class="location">{{ authProfile.address }}</p>
            </div>
          </div>
        </div>
      </div>
      <div @click="$emit('onCloseMoreInfo')" class="close-btn">
        <img src="../../../assets/icons/close.svg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    authProfile: Object,
  },
  computed: {
    getDate() {
      const date = new Date(this.authProfile.birthday);
      return `${date.getDate()} ${date.toLocaleString('default', {
        month: 'long',
      })} ${date.getFullYear()}`;
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
}

.sections-grid {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 110px auto;
}

.panel {
  width: 560px;
  background-color: rgb(41, 41, 41);
  border-radius: 10px;
  margin-right: 15px;
}

.separator {
  background-color: #8383833f;
  height: 1px;
  border-style: none;
  width: 100%;
}

.title-container {
  padding: 20px 25px;
}

div p {
  font-size: 14px;
  margin-left: 10px;
}

.more-info-content {
  padding: 0px 25px;
}

.info-section {
  padding: 20px 0px;
  display: flex;
}

.hint-text {
  color: grey;
}

.close-btn {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50px;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.close-btn img {
  width: 20px;
  height: 20px;
}

</style>