module.exports = {
  root: true,
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // allow async-await
    'generator-star-spacing': '1',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    "quotes": [1, "single"],
    'no-undef': 'off',
    'eqeqeq': 'off',
    'no-var': 0,
    'one-var': 0,
    'no-tabs': 0,
    'camelcase': 0,
    'no-sequences': 0,
    'no-mixed-operators': 0,
    'no-unused-expressions': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
