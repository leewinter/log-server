module.exports = {
  env: {
    node: true,
    es6: true,
    mocha: true
  },
  extends: ['bravissimo', 'prettier'],
  plugins: ['import', 'prettier'],
  rules: {
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
    'class-methods-use-this': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/__tests__/**'] // This should be included in airbnb rules, but isn't working
      }
    ],
    'no-underscore-dangle': 'off',
    'no-console': 0,
    'prettier/prettier': 'error'
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        root: 'src',
        alias: {}
      }
    }
  }
};
