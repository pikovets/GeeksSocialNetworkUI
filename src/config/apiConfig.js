export const API_BASE_URL = 'http://localhost:3000';

export const API_ENDPOINTS = {
  SIGNUP: '/auth/signup',
  LOGIN: '/auth/login',
  GET_USER_BY_ID: (userId) => `/users/${userId}`,
  GET_PROFILE_BY_ID: (userId) => `/profiles/${userId}`,
  UPDATE_USER: '/profiles/me',
  UPLOAD_POST: '/profiles/me/wall',
  GET_POSTS_BY_ID: (userId) => `/profiles/${userId}/wall`,
  GET_USERS_BY_NAME: (userName) => `/users/searchByName?name=${userName}`,
  DELETE_POST: (postId) => `/posts/${postId}`,
  TOGGLE_LIKE_POST: (postId) => `/posts/${postId}/toggleLike`
};
