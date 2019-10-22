module.exports = {
  "extends": ["airbnb-base", "plugin:jest/recommended","plugin:react/recommended"],
  "parser": "babel-eslint",
  "plugins": ["react", "react-native"],
  "globals": {
    "API_URL": true
  },
  "rules": {
    "arrow-body-style": "off",
    "class-methods-use-this": "off",
    "global-require": "off",
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "linebreak-style": "off",
    "no-multi-assign": "off",
    "no-param-reassign": ["error", { "props": false }],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "no-trailing-spaces":"off",
    "no-underscore-dangle": "off",
    "strict": "off",
    "no-nested-ternary": "off",
    "operator-linebreak": "off",
    "prefer-destructuring": "off",
    "prefer-template":"off",
    "no-unneeded-ternary": "off",
    "max-len": "off",
    "no-case-declarations": "off",
    "import/no-dynamic-require": "off",
    "no-use-before-define": "off",
    "prefer-object-spread": "off",
  }

  // prettier
  // root: true,
  // extends: '@react-native-community',
}