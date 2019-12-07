/* eslint no-undef: 0 */
/* eslint no-console: 0 */
import { Buffer } from 'buffer';

import { API_URL } from 'react-native-dotenv';

const setToken = (token) => ({
  type: 'TOKEN_SET',
  payload: token,
});

const removeToken = () => ({
  type: 'TOKEN_REMOVE',
});

const logout = () => {
  return removeToken();
};

const signupRequest = (user) => (store) => {
  return fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json', // eslint-disable-line
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((responseJSON) => {
      return store.dispatch(setToken(responseJSON.token));
    });
};

const loginRequest = (user) => (store) => {
  const usernameUriComponent = encodeURIComponent(user.username);
  const passwordUriComponent = encodeURIComponent(user.password);
  return fetch(`${API_URL}/login?username=${usernameUriComponent}?password=${passwordUriComponent}`, {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Content-Type': 'text/json',
      'Authorization': `Basic ${Buffer.from(`${user.username}:${user.password}`).toString('base64')}`, // eslint-disable-line
    },
  })
    .then((response) => response.json())
    .then((responseJSON) => {
      return store.dispatch(setToken(responseJSON.token));
    });
};

export { loginRequest, signupRequest, logout };
