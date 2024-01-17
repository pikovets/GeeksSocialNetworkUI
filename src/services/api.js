import { API_BASE_URL, API_ENDPOINTS } from '@/config/apiConfig';

const createApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

const fetchWithTimeout = (url, options, timeout = 5000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Timeout Error'));
      }, timeout);
    }),
  ]);
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const data = await response.clone().json();
    throw new Error(data.message);
  }
};

export const signup = async (userData) => {
  const response = await fetchWithTimeout(createApiUrl(API_ENDPOINTS.SIGNUP), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  await handleResponse(response);

  return response;
};

export const login = async (userData) => {
  const response = await fetchWithTimeout(createApiUrl(API_ENDPOINTS.LOGIN), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  await handleResponse(response);

  return response;
};

export const getUser = async (userId = 'me') => {
  const response = await fetch(
    createApiUrl(API_ENDPOINTS.GET_USER_BY_ID(userId)),
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('GeeksJwtToken')}`,
      },
    }
  );

  await handleResponse(response);

  return await response.json();
};

export const getProfile = async (userId = 'me') => {
  const response = await fetch(
    createApiUrl(API_ENDPOINTS.GET_PROFILE_BY_ID(userId)),
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('GeeksJwtToken')}`,
      },
    }
  );

  await handleResponse(response);

  return await response.json();
};

export const getPosts = async (userId = 'me') => {
  const response = await fetch(
    createApiUrl(API_ENDPOINTS.GET_POSTS_BY_ID(userId)),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('GeeksJwtToken')}`,
      },
    }
  );

  await handleResponse(response);

  return await response.json();
};

export const updateUser = async (user, profile) => {
  const response = await fetch(createApiUrl(API_ENDPOINTS.UPDATE_USER), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('GeeksJwtToken')}`,
    },
    body: JSON.stringify({ user, profile }),
  });

  await handleResponse(response);

  return response;
};

export const uploadPost = async (post) => {
  const response = await fetch(createApiUrl(API_ENDPOINTS.UPLOAD_POST), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('GeeksJwtToken')}`,
    },
    body: JSON.stringify(post),
  });

  await handleResponse(response);

  return response;
};

export const getUsersByName = async (userName) => {
  const response = await fetch(
    createApiUrl(API_ENDPOINTS.GET_USERS_BY_NAME(userName)),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('GeeksJwtToken')}`,
      },
    }
  );

  await handleResponse(response);

  return await response.json();
};

export const deletePost = async (postId) => {
  const response = await fetch(
    createApiUrl(API_ENDPOINTS.DELETE_POST(postId)),
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('GeeksJwtToken')}`,
      },
    }
  );

  await handleResponse(response);

  return response;
};

export const toggleLike = async (postId) => {
  const response = await fetch(
    createApiUrl(API_ENDPOINTS.TOGGLE_LIKE_POST(postId)),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('GeeksJwtToken')}`,
      },
    }
  );

  return response;
};
