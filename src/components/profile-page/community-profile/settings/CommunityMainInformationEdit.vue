<script>
import {validationRules} from "@/config/validationRules";
import GlowInput from "@/components/elements/GlowInput.vue";
import Select from "@/components/elements/Select.vue";
import {updateCommunity} from "@/services/api";
import {errorMessages} from "@/config/errorMessages";

export default {
  name: "CommunityMainInformationEdit",
  components: {Select, GlowInput},
  computed: {
    validationRules() {
      return validationRules
    }
  },
  props: {
    community: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      isOnline: window.navigator.onLine,
      isLoading: false,
      privacyOptions: ['Open', 'Closed'],
      publishOptions: ['Public', 'Admin Only', 'Admin And Moderators'],
    }
  },
  methods: {
    handleErrors(error) {
      this.isLoading = false;
      clearInterval(this.interval);

      console.log(error.message);

      if (error.message === errorMessages.TIMEOUT) {
        alert(this.$i18n.t('timeoutErrorMsg'));
      } else if (error.message === errorMessages.FETCH_FAILED) {
        alert(this.$i18n.t('serverErrorMsg'));
      }
    },
    async saveChanges() {
      try {
        if (!this.isOnline) {
          alert(this.$i18n.t('offlineErrorMsg'));
          return;
        }

        this.interval = setTimeout(() => {
          this.isLoading = true;
        }, 500);

        const updatedCommunity = {
          ...this.community,
          joinType: this.community.joinType.replaceAll(" ", "_").toUpperCase(),
          publishPermission: this.community.publishPermission
              .replaceAll(" ", "_")
              .toUpperCase(),
        };

        const response = await updateCommunity(updatedCommunity);

        this.isLoading = false;
        clearInterval(this.interval);

        if (response.ok) {
          this.$router.push({name: 'community-profile', params: {id: this.$route.params.id}});
        }
      } catch (error) {
        this.handleErrors(error);
      }
    },
    isFormValid() {
      return (
          this.isRequiredFieldValid(this.community.name, 'communityName') &&
          this.isNotRequiredFieldValid(this.community.description, 'communityDescription')
      );
    },
    isRequiredFieldValid(value, fieldName) {
      return (
          value !== '' &&
          this.validationRules[fieldName].test(value) &&
          this.backendErrors[fieldName] === ''
      );
    },
    isNotRequiredFieldValid(value, fieldName) {
      return value === '' || this.validationRules[fieldName].test(value);
    },
  }
}
</script>

<template>
  <div class="panel">
    <p class="section-title">Main information</p>
    <hr class="separator"/>
    <div class="form">
      <div class="form-item">
        <p class="field-hint">{{ $t('nameHint') }}</p>
        <GlowInput class="name-input" v-model="community.name" required :validation-rule="validationRules.communityName"
                   :validation-msg="$t('nameValidationMsg')"/>
      </div>
      <div class="form-item">
        <p class="field-hint">{{ $t('descriptionHint') }}</p>
        <textarea class="community-description-textarea" v-model="community.description" :rows="3" cols="60"></textarea>
        <p v-if="!validationRules.communityDescription.test(community.description)" class="validation-msg">{{$t('nameValidationMsg')}}</p>
      </div>
      <div class="form-item">
        <p class="field-hint">{{ $t('communityTypeHint') }}</p>
        <Select
            style="width: 60%"
            v-model="community.joinType"
            :placeholder="'Please select community privacy type'"
            :options="privacyOptions"
        />
      </div>
      <div class="form-item">
        <p class="field-hint">{{ $t('publishPermissionHint') }}</p>
        <Select
            style="width: 60%"
            v-model="community.publishPermission"
            :placeholder="'Please select community publish permission type'"
            :options="publishOptions"
        />
      </div>
      <button
          @click="saveChanges"
          class="save-btn"
          :disabled="!isFormValid"
      >
        Save
      </button>
    </div>
  </div>

</template>

<style scoped lang="scss">
.panel {
  @include transperent-panel-mixin;
  border-radius: 15px;
  border: $border;
  padding: 20px;
}

.section-title {
  font-size: 15px;
  color: $color-text-primary;
  margin-bottom: 25px;
}

.form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  padding-left: 50px;
}

.field-hint {
  color: $color-text-muted;
  font-size: 13px;
  margin-right: 10px;
  width: 100px;
  text-align: end;
}

.name-input {
  width: 275px;
}

.community-description-textarea {
  width: 60%;
  background-color: $color-grey-light;
  border-radius: 10px;
  border: none;
  padding: 5px 10px;
  color: $color-text-primary;
  font-size: 14px;
}

.save-btn {
  @include button-mixin($color-primary, color-text-primary, 62px, 32px, 0% 0%, false);
  align-self: center;

  color: $color-text-primary;
  font-size: 14px;
  margin-top: 15px;
}
</style>