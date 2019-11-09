/* eslint no-undef: 0 */
/* eslint no-console: 0 */

import { API_URL } from 'react-native-dotenv';

const setProfile = (profile) => ({
  type: 'PROFILE_SET',
  payload: profile,
});

const createProfileReq = (username) => (store) => {
  const { auth: token } = store.getState();

  return fetch(`${API_URL}/profile`, {
    method: 'POST',
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Accept': 'application/json', // eslint-disable-line
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // eslint-disable-line
    },
    body: JSON.stringify(username),
  })
    .then((response) => response.json())
    .then((resJSON) => {
      return store.dispatch(setProfile(resJSON));
    });
};

const updateProfileReq = (profile, lang, words, score) => (store) => {
  const { auth: token } = store.getState();

  return fetch(`${API_URL}/profile/${profile.id}`, {
    method: 'PUT', 
    // ...
  })
    .set('Authorization', `Bearer ${token}`)
    .send({ 
      profile, 
      language: lang, 
      words, 
      score, 
    })
    .then((res) => {
      return store.dispatch(setProfile(res.body));
    });
};

const fetchProfileReq = () => (store) => {
  const { auth: token } = store.getState();

  return fetch(`${API_URL}/profile/me`, {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Accept': 'application/json', // eslint-disable-line
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // eslint-disable-line
    },
  })
    .then((response) => response.json())
    .then((resJSON) => {
      return store.dispatch(setProfile(resJSON));
    });
};

export {
  setProfile,
  fetchProfileReq,
  createProfileReq,
  updateProfileReq,
};
