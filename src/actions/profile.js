import { fetch } from 'react-native';

const setProfile = (profile) => ({
  type: 'PROFILE_SET',
  payload: profile,
});

const createProfileReq = (username) => (store) => {
  const { auth: token } = store.getState();

  return fetch(`${API_URL}/profile`, {
    method: 'POST',
    // ...
  })
    .set('Authorization', `Bearer ${token}`)
    .send(username)
    .then((res) => {
      return store.dispatch(setProfile(res.body));
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
    // ...
  })
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      return store.dispatch(setProfile(res.body));
    });
};

export {
  setProfile,
  fetchProfileReq,
  createProfileReq,
  updateProfileReq,
};
