/* eslint no-undef: 0 */
/* eslint no-console: 0 */

import { API_URL } from 'react-native-dotenv';

const languageSelect = (language) => ({
  type: 'LANGUAGE_SELECT',
  payload: language,
});

const languageTransDirSet = (dir) => ({
  type: 'LANGUAGE_DIR_SET',
  payload: dir,
});

const languagesFetch = (languages) => ({
  type: 'LANGUAGES_SET',
  payload: languages,
});

const languageAdd = (language) => ({
  type: 'LANGUAGE_ADD',
  payload: language,
});

const languagesFetchRequest = () => (store) => {
  return fetch(`${API_URL}/languages/all`)
    .then((response) => response.json())
    .then((resJson) => {
      return store.dispatch(languagesFetch(resJson));
    })
    .catch(() => {
      return Promise.resolve(false);
    });
};

const languageCreateRequest = (lang) => (store) => {
  const { auth: token } = store.getState();
  const { 
    selectedLanguage, transliteration, spokenIn, family, totalSpeakers, 
  } = lang;

  return fetch(`${API_URL}/language`, {
    method: 'POST',
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      languageName: selectedLanguage, transliteration, spokenIn, family, totalSpeakers, wordCount: 0, 
    }),
  })
    .then((response) => response.json())
    .then((resJSON) => {
      return store.dispatch(languageAdd(resJSON));
    });
};

export { 
  languageSelect, languageCreateRequest, languagesFetchRequest, languageTransDirSet,
};
