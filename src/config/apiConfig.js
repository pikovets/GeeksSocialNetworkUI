export const API_BASE_URL = 'http://localhost:3000';

export const API_ENDPOINTS = {
  SIGNUP: '/auth/signup',
  LOGIN: '/auth/login',
  CURRENT_USER: '/users/me',
  GET_USER_BY_ID: (userId) => `/users/${userId}`,
  USER_PROFILE: '/profiles/me',
  GET_PROFILE_BY_ID: (userId) => `/profiles/${userId}`,
};
