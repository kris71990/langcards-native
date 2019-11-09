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

const wordsBulkAdd = (words) => ({
  type: 'BULK_ADD',
  payload: words,
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

// const wordPostRequest = (word) => (store) => {
//   const { auth: token } = store.getState();

//   return superagent.post(`${API_URL}/word`)
//     .set('Authorization', `Bearer ${token}`)
//     .send(word)
//     .then((response) => {
//       return store.dispatch(wordAdd(response.body));
//     });
// };

// const wordsBulkPostRequest = words => (store) => {
//   const { auth: token } = store.getState();
  
//   return superagent.post(`${API_URL}/words/bulk`)
//     .set('Authorization', `Bearer ${token}`)
//     .send(words)
//     .then((response) => {
//       return store.dispatch(wordsBulkAdd(response.body));
//     });
// };

// const wordUpdateRequest = word => (store) => {
//   const { auth: token } = store.getState();

//   return superagent.put(`${API_URL}/word/${word.wordId}`)
//     .set('Authorization', `Bearer ${token}`)
//     .send(word)
//     .then((response) => {
//       return store.dispatch(wordUpdate(response.body));
//     });
// };

// const wordDeleteRequest = id => (store) => {
//   const { auth: token } = store.getState();
  
//   return superagent.delete(`${API_URL}/word/${id}`)
//     .set('Authorization', `Bearer ${token}`)
//     .then(() => {
//       return store.dispatch(wordDelete(id));
//     });
// };

export {
  wordsFetchRequest,
  // wordPostRequest, wordsBulkPostRequest, wordUpdateRequest, wordDeleteRequest,
};
