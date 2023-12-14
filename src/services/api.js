import { API_BASE_URL, API_ENDPOINTS } from '@/config/apiConfig';
import router from '@/router';

const createApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

const handleResponse = async (response) => {
  if (!response.ok) {
    const clonedResponse = response.clone();

    const data = await clonedResponse.json();

    if (data.statusCode === 400) {
      throw new Error(data.message);
    } else if (data.statusCode === 404) {
      router.push({ name: '404' });
      return;
    }
  }
};

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

export const signup = async (userData) => {
  try {
    const response = await fetchWithTimeout(
      createApiUrl(API_ENDPOINTS.SIGNUP),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      }
    );

    await handleResponse(response);

    return response;
  } catch (error) {
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await fetchWithTimeout(
      createApiUrl(API_ENDPOINTS.LOGIN),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      }
    );

    await handleResponse(response);

    return response;
  } catch (error) {
    throw error;
  }
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

  handleResponse(response);

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

  handleResponse(response);

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

    console.log(JSON.stringify({ user, profile }));

    handleResponse(response);

    return response;
};

export const uploadPost = async (post) => {
  const response = await fetch(createApiUrl(API_ENDPOINTS.UPLODAD_POST), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('GeeksJwtToken')}`,
    },
    body: JSON.stringify(post),
  });

  handleResponse(response);

  return response;
}