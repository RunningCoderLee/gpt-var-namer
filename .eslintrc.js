module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  ignorePatterns: [
    'node_modules',
    'dist',
    'build',
    '.history',
    '*.md',
    'LICENSE',
  ],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
}
