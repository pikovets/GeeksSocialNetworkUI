<script>
import Header from '../components/Header.vue';
import MainSidebar from '../components/MainSidebar.vue';
import Users from '../components/friends-page/Users.vue';

import {getCommunitiesByName, getProfile, getUser, getUsersByName} from '../services/api.js';
import Communities from "@/components/communities-page/Communities.vue";
import SearchSidebar from "@/components/SearchSidebar.vue";

export default {
  name: 'Search',
  components: {
    SearchSidebar,
    Communities,
    Header,
    MainSidebar,
    Users,
  },
  data() {
    return {
      searchedUsers: [],
      searchedCommunities: [],
      authUser: {},
      authUserProfile: {},
      searchFilter: 'All',
    };
  },
  async mounted() {
    if (!localStorage.getItem('GeeksJwtToken')) {
      this.$router.push({name: 'LogIn'});
    }
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      this.authUser = await getUser();
      this.authUserProfile = await getProfile();

      await this.fetchSearchedUsersData();

      await this.fetchSearchedCommunitiesData();
    },

    async fetchSearchedUsersData() {
      const searchedUsersData = await getUsersByName(
          this.$route.query.searchQuery
      );
      this.searchedUsers = searchedUsersData.users;

      this.searchedUsers = this.searchedUsers.filter(
          (user) => user.id !== this.authUser.id
      );
    },

    async fetchSearchedCommunitiesData() {
      const searchedCommunitiesData = await getCommunitiesByName(
          this.$route.query.searchQuery
      );

      this.searchedCommunities = searchedCommunitiesData.communities;
    },
    filterSearch(moduleName) {
      this.searchFilter = moduleName;
    }
  },
  watch: {
    '$route.query'() {
      this.fetchSearchedUsersData();
      this.fetchSearchedCommunitiesData();
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
        <div v-if="searchedUsers.length > 0 && (searchFilter === 'All' || searchFilter === 'People')"
             class="users-section">
          <div class="section-header">
            <p class="section-title">{{ $t('peopleTitle') }}</p>
            <p v-if="searchFilter !== 'People' && searchedUsers.length > 5" class="show-all">{{ $t('showAll') }}</p>
          </div>
          <Users
              :users="searchedUsers"
              :authUser="authUser"
              :authUserProfile="authUserProfile"
              limit="5"
          />

          <hr v-if="searchFilter === 'All'" class="separator"/>
        </div>

        <div v-if="searchedCommunities.length > 0 && (searchFilter === 'All' || searchFilter === 'Communities')"
             class="communities-section">
          <div class="section-header">
            <p class="section-title">{{ $t('communitiesTitle') }}</p>
            <p v-if="searchFilter!=='Communities' && searchedCommunities.length > 5" @click="searchFilter='Communities'"
               class="show-all">{{ $t('showAll') }}</p>
          </div>
          <Communities
              :communities="searchedCommunities"
              :authUser="authUser"
              :authUserProfile="authUserProfile"
              :limit="searchFilter!=='Communities' ? 5 : 0"
          />
        </div>
      </div>

      <SearchSidebar @filter-search="filterSearch" class="settingsSidebar"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.responsive-container {
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
  overflow-y: auto;
}

.main-content {
  @include transperent-panel-mixin;
  width: 550px;
  border-radius: 12px;
  border: $border;
  padding: 15px 20px;
  margin-bottom: 100px;
}

.separator {
  margin: 2.5% 0 3% 0;
}

.section-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
}

.section-title {
  color: $color-text-primary;
  font-size: 17px;
  font-weight: bold;

}

.show-all {
  color: $color-text-primary;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;

  &:hover {
    color: $color-text-muted;
  }
}

.nothing-found {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 25px;
}

.nothing-found img {
  width: 100px;
  height: 100px;
  margin: 75px 0 10px 0;
}

.nothing-found p {
  font-size: 24px;
  margin-bottom: 75px;
  font-weight: bold;
  color: $color-text-primary;
}
</style>