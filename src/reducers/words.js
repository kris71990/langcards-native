const defaultState = {
  languageSelection: null,
  languageSelectionCode: null,
  translationDirection: null,
  words: null,
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'WORDS_SET':
      console.log(payload);
      const { 
        languageSelection, languageSelectionCode, translationDirection, words, 
      } = payload;
      return Object.assign({}, state, {
        words, languageSelection, translationDirection, languageSelectionCode,
      });
    case 'WORD_ADD':
      const ids = state.words.map((w) => w.wordId);
      if (ids.includes(payload.wordId)) return state;
      return Object.assign({}, state, {
        words: [...state.words, payload],
      });
    case 'BULK_ADD':
      return Object.assign({}, state, {
        words: payload,
      });
    case 'WORD_UPDATE':
      const oldWords = state.words.filter((w) => w.wordId !== payload.wordId);
      return Object.assign({}, state, {
        words: [...oldWords, payload],
      });
    case 'WORD_DELETE':
      const newWords = state.words.filter((w) => w.wordId !== payload);
      return Object.assign({}, state, {
        words: newWords,
      });
    default:
      return state;
  }
};
