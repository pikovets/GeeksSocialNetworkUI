<script>
export default {
  props: {
    communityProfile: Object,
  },
  computed: {
    getDate() {
      const date = new Date(this.communityProfile.createdDate);
      return `${date.getDate()} ${date.toLocaleString('default', {
        month: 'long',
      })} ${date.getFullYear()}`;
    },
  },
  methods: {
    capitalizeWord(word) {
      if (!word) return '';
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  }
};
</script>

<template>
  <div class="overlay">
    <div class="sections-grid">
      <div class="panel">
        <div class="title-container">
          <p class="title">{{ $t('additionInfo') }}</p>
        </div>
        <div class="more-info-content">
          <div v-show="communityProfile.description !== null" class="info-section">
            <img src="../../../assets/icons/bio.svg"/>
            <p class="bio">{{ communityProfile.description }}</p>
          </div>
          <div class="info-section">
            <img src="../../../assets/icons/send.svg"/>
            <p class="hint-text">{{ $t('publishPermissionHint') }}</p>
            <p class="publish-permission">{{capitalizeWord(communityProfile.publishPermission)}}</p>
          </div>
          <div class="info-section">
            <img src="../../../assets/icons/communities.svg"/>
            <p class="hint-text">{{ $t('communityTypeHint') }}</p>
            <p class="join-type">{{ capitalizeWord(communityProfile.joinType)}}</p>
          </div>
          <div class="info-section">
            <img src="../../../assets/icons/event.svg"/>
            <p class="hint-text">{{ $t('createdDateHint') }}</p>
            <p class="created-date">{{ getDate}}</p>
          </div>
        </div>
      </div>
      <div @click="$emit('onCloseMoreInfo')" class="close-btn">
        <img src="../../../assets/icons/close.svg"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
  background-color: $color-bg-dark;
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
  color: $color-text-primary;
}

.more-info-content {
  padding: 0px 25px;
}

.info-section {
  padding: 20px 0px;
  display: flex;
  align-items: center;

  img {
    width: 20px;
    height: 20px;
  }
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
