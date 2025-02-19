export const API_BASE_URL = 'http://172.18.0.1:3000';

export const API_ENDPOINTS = {
  SIGNUP: '/auth/signup',
  LOGIN: '/auth/login',
  GET_USER_BY_ID: (userId) => `/users/${userId}`,
  GET_PROFILE_BY_ID: (userId) => `/profiles/${userId}`,
  UPDATE_USER: '/profiles/me',
  UPLOAD_USER_POST: '/profiles/me/wall',
  GET_POSTS_BY_ID: (userId) => `/profiles/${userId}/wall`,
  GET_POST: (postId) => `/posts/${postId}`,
  GET_USERS_BY_NAME: (userName) => `/users/searchByName?name=${userName}`,
  DELETE_POST: (postId) => `/posts/${postId}`,
  TOGGLE_LIKE_POST: (postId) => `/posts/${postId}/toggleLike`,
  GET_FRIEND_REQUEST: (userId) =>
    `/userRelations/getFriendRequest?userId=${userId}`,
  ACCEPT_FRIEND_REQUEST: (userId) =>
    `/userRelations/acceptFriendRequest?userId=${userId}`,
  SEND_FRIEND_REQUEST: (userId) =>
    `/userRelations/sendFriendRequest?userId=${userId}`,
  REMOVE_FRIEND_REQUEST: (userId) =>
    `/userRelations/removeFriendRequest?userId=${userId}`,
  GET_FRIENDS: (userId) => `/users/${userId}/getFriends`,
  GET_ACCEPT_FRIEND_REQUESTS: `/users/me/getAcceptFriendRequests`,
  GET_FEED: `/posts/feed`,
  TOGGLE_LIKE_COMMENT: (commentId) => `/comments/${commentId}/toggleLike`,
  SEND_COMMNENT: (postId) => `/posts/${postId}/addComment`,
  DELETE_COMMENT: (commentId) => `/comments/${commentId}`,
  GET_COMMUNITIES: (userId) => `/users/${userId}/getCommunities`,
  JOIN_COMMUNITY: (communityId) => `/communities/${communityId}/join`,
  LEAVE_COMMUNITY: (communityId) => `/communities/${communityId}/leave`,
  GET_USER_COMMUNITY: (communityId) =>
    `/communities/${communityId}/getCurrentUserRole`,
  CREATE_COMMUNITY: '/communities',
  GET_COMMUNITY_PROFILE: (communityId) =>
    `/communities/${communityId}/getCommunityProfile`,
  UPLOAD_COMMUNITY_POST: (communityId) => `/communities/${communityId}/wall`,
};
