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
      path: '/profile/:id',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
    },
    {
      path: '/profile/me/edit',
      name: 'edit-profile',
      component: () => import('../views/EditProfile.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/Search.vue'),
    },
    {
      path: '/profile/:id/friends',
      name: 'friends',
      component: () => import('../views/Friends.vue'),
    },
  ],
});

export default router;
