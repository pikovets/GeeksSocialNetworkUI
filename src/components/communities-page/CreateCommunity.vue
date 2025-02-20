<script>
import Select from '../elements/Select.vue';
import {errorMessages} from '../../config/errorMessages';
import {validationRules} from '../../config/validationRules';
import {createCommunity} from '../../services/api';
import GlowInput from "@/components/elements/GlowInput.vue";

export default {
  components: {
    GlowInput,
    Select,
  },
  computed: {
    titleText() {
      return this.currentStep === 1
          ? this.$t('createCommunityLabel')
          : this.$t('selectSubjectLabel');
    },
    subtitleText() {
      return this.currentStep === 1
          ? this.$t('createCommunitySubtitle')
          : this.$t('selectSubjectSubtitle');
    },
    createCommunityBtn() {
      return this.currentStep === 1
          ? this.$t('continue')
          : this.$t('createCommunityLabel');
    },
    getCommunityNameLength() {
      return this.communityData.name.length;
    },
    isFormValid() {
      if (this.currentStep === 1) {
        return (
            this.isValidField(this.communityData.name, 'communityName') &&
            this.isValidField(this.communityData.joinType, 'privacy')
        );
      } else {
        return this.communityData.category !== '';
      }
    },
  },
  data() {
    return {
      isOnline: window.navigator.onLine,
      isLoading: false,
      currentStep: 1,
      validationRules,
      privacyOptions: ['Open', 'Closed'],
      communityData: {
        name: '',
        joinType: '',
        category: '',
      },
      categories: [
        'Technology',
        'Health & Wellness',
        'Finance & Business',
        'Education & Learning',
        'Entertainment',
        'Sports & Fitness',
        'Travel & Tourism',
        'Food & Culinary',
        'Science & Research',
        'Automotive',
        'Real Estate',
        'Fashion & Beauty',
        'Parenting & Family',
        'Gaming',
        'Music & Arts',
        'Books & Literature',
        'Politics & Government',
        'Environment & Sustainability',
        'DIY & Crafts',
        'Pets & Animals',
        'Spirituality & Religion',
        'History & Culture',
        'Photography',
        'Marketing & Advertising',
        'Productivity & Self-Improvement',
      ],
      shake: {
        name: false,
        joinType: false,
        category: false,
      },
    };
  },
  methods: {
    async onContinueCreateCommunity() {
      if (!this.isFormValid) {
        ['name', 'joinType', 'category'].forEach((field) => {
          if (!this.isValidField(this.communityData[field], field)) {
            this.shakeField(field);
          }
        });
        return;
      }
      if (this.currentStep === 1) {
        this.currentStep++;
      } else {
        try {
          if (!this.isOnline) {
            alert(this.$i18n.t('offlineErrorMsg'));
            return;
          }

          this.interval = setTimeout(() => {
            this.isLoading = true;
          }, 500);

          this.communityData.joinType =
              this.communityData.joinType.toUpperCase();
          this.communityData.category = this.communityData.category
              .replace(` & `, '_')
              .toUpperCase();

          await createCommunity(this.communityData);

          this.isLoading = false;
          clearInterval(this.interval);

          this.$router.go();
        } catch (error) {
          this.handleCreateCommunityError(error);
        }
      }
    },
    handleCreateCommunityError(error) {
      this.isLoading = false;
      clearInterval(this.interval);

      if (error.message === errorMessages.TIMEOUT) {
        alert(this.$i18n.t('timeoutErrorMsg'));
      } else if (error.message === errorMessages.FETCH_FAILED) {
        alert(this.$i18n.t('serverErrorMsg'));
      }
    },

    isValidField(value, fieldName) {
      const rule = this.validationRules[fieldName];
      return value !== '' && (!rule || rule.test(value));
    },

    shakeField(fieldName) {
      this.shake[fieldName] = true;
      setTimeout(() => {
        this.shake[fieldName] = false;
      }, 820);
    },
  },
};
</script>

<template>
  <div class="overlay">
    <div class="sections-grid">
      <div class="panel">
        <div class="title-container">
          <p class="current-step">Step {{ currentStep }} of 2</p>
          <p class="title">{{ titleText }}</p>
          <p class="subtitle">{{ subtitleText }}</p>
        </div>

        <div class="community-registration-form">
          <div class="community-name-section" v-show="currentStep === 1">
            <div class="section-metadata">
              <p class="section-name">{{ $t('communityNameSection') }}</p>
              <p class="community-name-length-info">
                {{ getCommunityNameLength }} / 48
              </p>
            </div>

            <GlowInput
                v-model="communityData.name"
                :label="$t('enterName')"
                :validationRule="validationRules.communityName"
                :validationMsg="$t('communityNameValidationMsg')"
                @clearBackendErrors="clearBackendErrors"
                :class="{ 'apply-shake': shake.name }"
            ></GlowInput>
          </div>

          <div class="community-privacy-section" v-show="currentStep === 1">
            <div class="section-metadata">
              <p class="section-name">{{ $t('communityPrivacySection') }}</p>
            </div>
            <Select
                v-model="communityData.joinType"
                :placeholder="'Please select community privacy type'"
                :options="privacyOptions"
                :class="{ 'apply-shake': shake.joinType }"
            />
          </div>

          <div class="community-category-section" v-show="currentStep === 2">
            <div class="section-metadata">
              <p class="section-name">{{ $t('communityCategorySection') }}</p>
            </div>

            <Select
                v-model="communityData.category"
                editable
                :options="categories"
                placeholder="Select subject"
                :class="{ 'apply-shake': shake.category }"
            />
          </div>

          <div class="form-interaction-buttons">
            <button
                :class="[
                !isFormValid ? 'passive-btn' : '',
                'create-community-btn',
              ]"
                @click="onContinueCreateCommunity"
            >
              {{ createCommunityBtn }}
            </button>
          </div>
        </div>
      </div>

      <div @click="$emit('onCloseCommunityCreation')">
        <img src="../../assets/icons/close.svg" class="close-btn"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
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
  margin: 250px auto;
}

.panel {
  width: 450px;
  background-color: $color-bg-dark;
  border-radius: 10px;
  margin-right: 15px;
  padding: 22.5px;
}

.title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.current-step {
  font-size: 14px;
  margin-bottom: 5px;
  color: $color-text-muted;
}

.title {
  font-size: 20px;
  color: rgb(72, 136, 63);
  font-weight: bold;
  margin-bottom: 5px;
}

.subtitle {
  font-size: 14px;
  width: 350px;
  text-align: center;
  color: $color-text-muted;
}

.section-metadata {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
}

.section-metadata p {
  font-size: 14px;
  color: rgb(147, 147, 147);
}

.community-name-section {
  margin-bottom: 15px;
}

.create-community-btn {
  background-color: rgb(72, 136, 63);
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  font-size: 14px;
  padding: 10px 10px;
  width: 100%;
  transition: background-color 0.1s, transform 0.1s, opacity 0.1s;
}

.form-interaction-buttons {
  margin-top: 10px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.apply-shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

.close-btn {
  cursor: pointer;
}
</style>
