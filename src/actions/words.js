/* eslint no-undef: 0 */
/* eslint no-console: 0 */

import { API_URL } from 'react-native-dotenv';

const wordsFetch = (words) => ({
  type: 'WORDS_SET',
  payload: words,
});

const wordAdd = (word) => ({
  type: 'WORD_ADD',
  payload: word,
});

const wordUpdate = (word) => ({
  type: 'WORD_UPDATE',
  payload: word,
});

const wordDelete = (id) => ({
  type: 'WORD_DELETE',
  payload: id,
});

const wordsFetchRequest = (langData) => (store) => {
  const { 
    languageSelection, languageSelectionCode, translationDirection, languageSelectionLocal, languageSelectionTransliteration, spokenIn, family, totalSpeakers,
  } = langData;
  const languageUriComponent = encodeURIComponent(languageSelection);
  return fetch(`${API_URL}/words/${languageSelectionCode}?languageSelection=${languageUriComponent}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((resJson) => {
      return store.dispatch(wordsFetch({
        words: resJson,
        languageSelection,
        languageSelectionCode,
        translationDirection,
        languageSelectionLocal,
        languageSelectionTransliteration,
        spokenIn,
        family,
        totalSpeakers,
      }));
    })
    .catch((error) => {
      console.log(error);
    });
};

const wordPostRequest = (word) => (store) => {
  const { auth: token } = store.getState();

  return fetch(`${API_URL}/word`, {
    method: 'POST',
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(word),
  })
    .then((response) => response.json())
    .then((resJSON) => {
      return store.dispatch(wordAdd(resJSON));
    });
};

const wordUpdateRequest = (word) => (store) => {
  const { auth: token } = store.getState();

  return fetch(`${API_URL}/word/${word.wordId}`, {
    method: 'PUT',
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(word),
  })
    .then((response) => response.json())
    .then((resJSON) => {
      return store.dispatch(wordUpdate(resJSON));
    });
};

const wordDeleteRequest = (id) => (store) => {
  const { auth: token } = store.getState();
  
  return fetch(`${API_URL}/word/${id}`, {
    method: 'DELETE',
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then(() => {
      return store.dispatch(wordDelete(id));
    });
};

export {
  wordsFetchRequest, wordUpdateRequest, wordDeleteRequest, wordPostRequest,
};
