import { API_BASE_URL, API_ENDPOINTS } from '@/config/apiConfig';
import router from '@/router';

const createApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

const handleResponse = async (response) => {
  if (!response.ok) {
    const data = await response.json();

    if (data.statusCode === 400) {
      throw new Error(data.message);
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
    const response = await fetchWithTimeout(createApiUrl(API_ENDPOINTS.LOGIN), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    await handleResponse(response);

    return response;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (userId) => {
  let response;

  if (!userId) {
    response = await fetch(createApiUrl(API_ENDPOINTS.CURRENT_USER), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('GeeksJwtToken')}`,
      },
    });
  } else {
    response = await fetch(
      createApiUrl(API_ENDPOINTS.GET_USER_BY_ID(userId)),
      {}
    );
  }

  if (!response.ok) {
    if (response.status === 404) {
      router.push({ name: '404' });
      return;
    }

    throw new Error();
  }

  return await response.json();
};

export const getProfile = async (userId) => {
  let response;

  if (!userId) {
    response = await fetch(createApiUrl(API_ENDPOINTS.USER_PROFILE), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('GeeksJwtToken')}`,
      },
    });
  } else {
    response = await fetch(
      createApiUrl(API_ENDPOINTS.GET_PROFILE_BY_ID(userId)),
      {}
    );
  }

  if (!response.ok) {
    if (response.status === 404) {
      router.push({ name: '404' });
      return;
    }

    throw new Error();
  }

  return await response.json();
};
