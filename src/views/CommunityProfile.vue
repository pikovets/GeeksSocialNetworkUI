<script>
import AddPost from '../components/AddPost.vue';
import CommunityProfileHeader from '../components/profile-page/community-profile/CommunityProfileHeader.vue';
import Header from '../components/Header.vue';
import MainSidebar from '../components/MainSidebar.vue';
import Posts from '../components/post/Posts.vue';
import ProfileSidebarSection from '../components/profile-page/ProfileSidebarSection.vue';

import { deletePost, getCommunityProfile, getUser, fetchUserCommunityState} from '../services/api';

export default {
  components: {
    Header,
    CommunityProfile: CommunityProfileHeader,
    AddPost,
    Posts,
    MainSidebar,
    ProfileSidebarSection,
  },
  data() {
    return {
      showAdditionalInfo: false,
      authUser: {},
      community: {
        followers: [],
      },
      userCommunityState: {},
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
    <Header :authUser="authUser" />

    <div class="responsive-container">
      <MainSidebar class="main-sidebar" />

      <div class="main-content">
        <CommunityProfile
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
            <ProfileSidebarSection
                title="Followers"
                itemType="user"
                routeName="friends"
                :items="community.followers"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <MoreInfoCommunity
    @onCloseMoreInfo="showAdditionalInfo = false"
    v-show="showAdditionalInfo"
    :authProfile="community"
  /> -->
</template>

<style scoped>
.sections-grid {
  display: grid;
  grid-template-columns: 560px 280px;
  gap: 15px;
}

.main-sidebar {
  margin-right: 25px;
}

.sidebar div {
  margin-bottom: 15px;
}
</style>
