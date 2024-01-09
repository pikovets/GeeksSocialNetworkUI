import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
  ],
});

export default router;
