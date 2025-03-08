<script>
import Header from '../components/Header.vue';
import MainSidebar from '../components/MainSidebar.vue';
import {validationRules} from '../config/validationRules';
import {getCommunityProfile, getUser} from "@/services/api";
import CommunityMainInformationEdit
  from "@/components/profile-page/community-profile/settings/CommunityMainInformationEdit.vue";
import CommunityAdditionalInformationEdit
  from "@/components/profile-page/community-profile/settings/CommunityAdditionalInformationEdit.vue";

export default {
  components: {
    CommunityAdditionalInformationEdit,
    CommunityMainInformationEdit,
    Header,
    MainSidebar,
  },
  data() {
    return {
      isOnline: window.navigator.onLine,
      isLoading: false,
      community: {},
      authUser: {},
    };
  },
  async mounted() {
    if (!localStorage.getItem('GeeksJwtToken')) {
      this.$router.push({name: 'LogIn'});
    }
    await this.fetchUserData();
  },
  computed: {
    getAvatarLink() {
      return this.community.photoLink ? this.community.photoLink : '';
    },
  },
  methods: {
    async fetchUserData() {
      this.authUser = await getUser();
      this.community = await getCommunityProfile(this.$route.params.id);

      const createdDate = new Date(this.community.createdDate);

      const day = String(createdDate.getDate()).padStart(2, '0');
      const month = String(createdDate.getMonth() + 1).padStart(2, '0');
      const year = createdDate.getFullYear();

      this.community.createdDate = `${day}.${month}.${year}`;

      this.community.joinType = this.community.joinType === 'OPEN' ? 'Open' : 'Closed';
      this.community.publishPermission = this.community.publishPermission
          .toLowerCase()
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
    },
  },
};
</script>

<template>
  <div id="animatedBackground">
    <Header :authUser="authUser"/>

    <div class="responsive-container">
      <MainSidebar/>

      <div class="edit-profile-container">
        <div class="edit-form">
          <CommunityMainInformationEdit
              :community="community"
          />

          <CommunityAdditionalInformationEdit
              :community="community"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.responsive-container {
  align-items: flex-start;
}

.edit-profile-container {
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  width: 550px;
}

.title {
  font-weight: bold;
  font-size: 1.5rem;
  color: $color-text-primary;
  text-align: center;
  margin-bottom: 20px;
}

</style>
