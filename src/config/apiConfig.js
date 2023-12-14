export const API_BASE_URL = 'http://localhost:3000';

export const API_ENDPOINTS = {
  SIGNUP: '/auth/signup',
  LOGIN: '/auth/login',
  GET_USER_BY_ID: (userId) => `/users/${userId}`,
  GET_PROFILE_BY_ID: (userId) => `/profiles/${userId}`,
  UPDATE_USER: '/profiles/me',
};
