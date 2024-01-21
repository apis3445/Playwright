// .eslintrc.cjs

/* eslint-env node */
module.exports = {
    extends: ['eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/stylistic',
        'plugin:playwright/recommended'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        '@typescript-eslint/no-floating-promises': 'error',
        'quotes': [2, 'single', { 'avoidEscape': true }]
    },
    parserOptions: {
        project: 'tsconfig.eslint.json',
        sourceType: 'module',
    },
};