import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ['**/checkly.config.ts', 'eslint.config.mjs'],
}, ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic',
    'plugin:playwright/recommended',
), {
    plugins: {
        '@typescript-eslint': typescriptEslint
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: 'module',

        parserOptions: {
            project: 'tsconfig.eslint.json',
        },
    },

    rules: {
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-unused-vars': 'error',

        indent: ['error', 4, {
            SwitchCase: 1,
        }],

        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
    },
    
}];