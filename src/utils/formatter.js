const cardViewFormatter = (languageObj) => {
  const { type, language, direction } = languageObj;
  let capitalizedLanguage = null;
  switch (type) {
    case 'language-simple':
      capitalizedLanguage = language.charAt(0).toUpperCase() + language.slice(1);
      return capitalizedLanguage;
    case 'trans':
      capitalizedLanguage = language.charAt(0).toUpperCase() + language.slice(1);
      switch (direction) {
        case 'native-english':
          return `${capitalizedLanguage} - English`;
        default:
          return `English - ${capitalizedLanguage}`;
      }
    default:
      return null;
  }
};

export default cardViewFormatter;
