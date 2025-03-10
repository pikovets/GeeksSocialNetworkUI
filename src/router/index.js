import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUp.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LogIn.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/user-profile-page/:id',
      name: 'user-profile',
      component: () => import('../views/UserProfile.vue'),
    },
    {
      path: '/user-profile-page/me/edit',
      name: 'edit-profile',
      component: () => import('../views/EditUserProfile.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/Search.vue'),
    },
    {
      path: '/user-profile-page/:id/friends',
      name: 'friends',
      component: () => import('../views/Friends.vue'),
    },
    {
      path: '/user-profile-page/:id/communities',
      name: 'communities',
      component: () => import('../views/Communities.vue'),
    },
    {
      path: '/community/:id',
      name: 'community-profile',
      component: () => import('../views/CommunityProfile.vue'),
    },
    {
      path: '/community/:id/followers',
      name: 'followers',
      component: () => import('../views/Followers.vue'),
    },
    {
      path: '/community/:id/manage',
      name: 'community-profile-manage',
      component: () => import('../views/EditCommunityProfile.vue'),
    }
  ],
});

export default router;
