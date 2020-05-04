module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  rules: {
    indent: 'off',
    'comma-dangle': ['error', 'never'],
    extensions: 'off',
    'no-underscore-dangle': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-param-reassign': 'off',
    'import/no-unresolved': 'off',
    'no-plusplus': 'off',
    'import/extensions': 'off',
    'object-curly-newline':'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
