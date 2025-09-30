import js from '@eslint/js';
import globals from 'globals';
import svelte from 'eslint-plugin-svelte';
import tseslint from 'typescript-eslint';
import svelteParser from 'svelte-eslint-parser';

const ignores = [
  '.svelte-kit/**',
  'build/**',
  'dist/**',
  'node_modules/**',
  'coverage/**',
  '*.config.cjs'
];

export default [
  {
    name: 'project/ignores',
    ignores
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  ...svelte.configs['flat/recommended'],
  {
    name: 'project/typescript-tweaks',
    files: ['**/*.{ts,js}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-undef': 'off'
    }
  },
  {
    name: 'project/svelte-tweaks',
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.svelte']
      },
      globals: {
        ...globals.browser
      }
    },
    rules: {
      'svelte/no-at-debug-tags': 'warn',
      'no-undef': 'off'
    }
  },
  {
    name: 'project/scripts',
    files: ['scripts/**/*.{ts,js}'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }
];
