module.exports = {
  extends: ['airbnb'],
  globals: {
    fetch: true
  },
  rules: {
    'react/jsx-filename-extension': 0,
    'no-underscore-dangle': 0,
    'max-len': 0,
    'react/prop-types': 0,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
  },
}
