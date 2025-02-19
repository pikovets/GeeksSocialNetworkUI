<script>
import AddPost from '../components/AddPost.vue';
import Header from '../components/Header.vue';
import MainSidebar from '../components/MainSidebar.vue';
import UserProfileMoreInfo from '../components/profile-page/user-profile/UserProfileMoreInfo.vue';
import Posts from '../components/post/Posts.vue';
import ProfileSidebarSection from '../components/profile-page/ProfileSidebarSection.vue';
import UserProfileHeader from '../components/profile-page/user-profile/UserProfileHeader.vue';

import {deletePost, getCommunities, getFriends, getPosts, getProfile, getUser,} from '../services/api';

export default {
  components: {
    Header,
    UserProfile: UserProfileHeader,
    AddPost,
    Posts,
    MainSidebar,
    MoreInfo: UserProfileMoreInfo,
    ProfileSidebarSection,
  },
  data() {
    return {
      showAdditionalInfo: false,
      authUser: {},
      user: {},
      profile: {},
      friends: [],
      posts: [],
      communities: [],
    };
  },
  async mounted() {
    if (localStorage.getItem('GeeksJwtToken') === null) {
      this.$router.push('/login');
    }

    await this.fetchUserData();
  },
  watch: {
    '$route.query'() {
      this.$router.go();
    },
  },
  methods: {
    async fetchUserData() {
      const authUserData = await getUser('me');
      this.authUser = authUserData;

      const userData = await getUser(this.$route.params.id);
      this.user = userData;

      const profileData = await getProfile(this.$route.params.id);
      this.profile = profileData;

      const postsData = await getPosts(this.$route.params.id);
      this.posts = postsData.posts;

      const friendsData = await getFriends(this.$route.params.id);
      this.friends = friendsData.users;

      const communitiesData = await getCommunities(this.$route.params.id);
      this.communities = communitiesData.communities;
    },
    async deletePost(postId) {
      const response = await deletePost(postId);

      if (response.ok) {
        this.posts = this.posts.filter((post) => post.id !== postId);
      }
    },
  },
};
</script>

<template>
  <div id="animatedBackground">
    <Header :authUser="authUser"/>

    <div class="responsive-container" style="margin-top: 130px;">
      <MainSidebar class="main-sidebar"/>

      <div class="main-content">
        <UserProfile
            @onMoreInfoClick="showAdditionalInfo = true"
            :authUser="authUser"
            :user="user"
            :profile="profile"
        />

        <div class="sections-grid">
          <div class="post-feed">
            <AddPost
                v-show="user.id === authUser.id"
                :authUser="user"
                :posts="posts"
            />
            <Posts
                @delete-post="deletePost"
                @update-post="updatePost"
                :posts="posts"
                :authUser="authUser"
            />
          </div>

          <div class="sidebar">
            <ProfileSidebarSection
                title="Friends"
                routeName="friends"
                itemType="user"
                :items="friends"
            />
            <ProfileSidebarSection
                title="Communities"
                routeName="communities"
                itemType="community"
                :items="communities"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <MoreInfo
      @onCloseMoreInfo="showAdditionalInfo = false"
      v-show="showAdditionalInfo"
      :authProfile="profile"
  />
</template>

<style scoped>
.sections-grid {
  display: grid;
  grid-template-columns: 560px 280px;
  gap: 15px;
}

.sidebar div {
  margin-bottom: 15px;
}
</style>
