<script>
import AddPost from '../components/AddPost.vue';
import CommunityProfileHeader from '../components/profile-page/community-profile/CommunityProfileHeader.vue';
import Header from '../components/Header.vue';
import MainSidebar from '../components/MainSidebar.vue';
import Posts from '../components/post/Posts.vue';
import ProfileSidebarSection from '../components/profile-page/ProfileSidebarSection.vue';

import {deletePost, fetchUserCommunityState, getCommunityProfile, getUser} from '../services/api';
import CommunityManageSidebar from "@/components/profile-page/community-profile/CommunityManageSidebar.vue";
import ClosedCommunityIcon from "@/assets/icons/private-community.svg"
import InfoIcon from "@/assets/icons/info.svg"
import CommunityProfileMoreInfo from "@/components/profile-page/community-profile/CommunityProfileMoreInfo.vue";
import community from "../components/communities-page/Community.vue";

export default {
  computed: {
    community() {
      return community
    }
  },
  components: {
    CommunityProfileMoreInfo,
    Header,
    CommunityProfileHeader,
    AddPost,
    Posts,
    MainSidebar,
    ProfileSidebarSection,
    CommunityManageSidebar
  },
  data() {
    return {
      showAdditionalInfo: false,
      authUser: {},
      community: {
        followers: [],
      },
      userCommunityState: {},
      closedCommunityIcon: ClosedCommunityIcon,
      infoIcon: InfoIcon,
    };
  },
  async mounted() {
    if (localStorage.getItem('GeeksJwtToken') === null) {
      this.$router.push('/login');
    }

    await this.fetchData();
  },
  watch: {
    '$route.query'() {
      this.$router.go();
    },
  },
  methods: {
    async fetchData() {
      this.authUser = await getUser('me');

      this.community = await getCommunityProfile(this.$route.params.id);

      this.userCommunityState = await fetchUserCommunityState(
          this.community.id
      );
    },
    async deletePost(postId) {
      const response = await deletePost(postId);

      if (response.ok) {
        this.community.posts = this.community.posts.filter(
            (post) => post.id !== postId
        );
      }
    },
    isUserAllowedToPost() {
      if (this.community.publishPermission === 'ADMIN') {
        return (
            this.userCommunityState !== null &&
            this.userCommunityState === 'ADMIN'
        );
      } else if (this.community.publishPermission === 'ADMIN_AND_MODERATORS') {
        return (
            this.userCommunityState !== null &&
            (this.userCommunityState === 'ADMIN' ||
                this.userCommunityState === 'MODERATOR')
        );
      } else {
        return true;
      }
    },
  },
};
</script>

<template>
  <div id="animatedBackground">
    <Header :authUser="authUser"/>

    <div class="responsive-container">
      <MainSidebar class="main-sidebar"/>

      <div class="main-content">
        <CommunityProfileHeader
            @onMoreInfoClick="showAdditionalInfo = true"
            :authUser="authUser"
            :community="community"
        />

        <div class="sections-grid">
          <div class="post-feed">
            <AddPost
                v-show="isUserAllowedToPost"
                :authUser="authUser"
                :community="community"
            />
            <Posts
                @delete-post="deletePost"
                @update-post="updatePost"
                :posts="community.posts"
                :authUser="authUser"
            />
          </div>

          <div class="sidebar">
            <CommunityManageSidebar v-if="userCommunityState === 'ADMIN'"/>
            <div class="community-access-info-container">
              <div class="icon-container">
                <img class="icon filter-green" :src="closedCommunityIcon"/>
              </div>

              <p class="access-info">{{community.joinType && community.joinType.charAt(0) + community.joinType.substring(1).toLowerCase()}} community</p>
            </div>
            <div class="community-info-container">
              <div class="icon-container">
                <img class="icon filter-green" :src="infoIcon"/>
              </div>

              <p @click="showAdditionalInfo = true" class="additional-info">Additional info</p>
            </div>
            <ProfileSidebarSection
                title="Followers"
                itemType="user"
                routeName="followers"
                :items="community.followers"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <CommunityProfileMoreInfo
      @onCloseMoreInfo="showAdditionalInfo = false"
      v-show="showAdditionalInfo"
      :communityProfile="community"
  />
</template>

<style scoped lang="scss">
.responsive-container {
  overflow-y: auto;
}

.sections-grid {
  display: grid;
  grid-template-columns: 550px 345px;
  gap: 15px;
}

.main-sidebar {
  margin-right: 25px;
}

.sidebar div {
  margin-bottom: 15px;
}

.community-access-info-container {
  @include transperent-panel-mixin;
  border: $border;
  padding-left: 15px;
  padding-bottom: 0;
  border-radius: 10px;
  height: 50px;

  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  .icon-container {
    margin-right: 10px;
    margin-bottom: 0;
  }

  .access-info {
    font-size: 13px;
    color: $color-text-primary;
  }
}

.community-info-container {
  @include transperent-panel-mixin;
  border: $border;
  padding-left: 15px;
  padding-bottom: 0;
  border-radius: 10px;
  height: 50px;

  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  .icon-container {
    margin-right: 10px;
    margin-bottom: 0;
    height: 20px;
  }

  .additional-info {
    font-size: 13px;
    color: $color-primary;

    &:hover {
      text-decoration: underline;
      cursor: pointer;

    }
  }
}

.post-feed {
  margin-bottom: 100px;
}
</style>
