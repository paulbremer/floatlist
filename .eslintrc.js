module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-warning-comments': 'off',
    'func-names': 0,
    'no-console': 0,
    'space-before-function-paren': 0,
    'object-shorthand': 0,
    'space-in-parens': 0,
    'semi': 0,
    'no-undef': 0,
    'prefer-arrow-callback': 0,
    'prefer-template': 0,
    'no-unused-vars': 0,
    'no-plusplus': 0,
    'no-shadow': 0,
    'absolute-first': 0,
    'no-loop-func': 0,
    'no-mixed-operators': 0,
  }
}
