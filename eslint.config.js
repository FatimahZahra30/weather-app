import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintPluginVue from 'eslint-plugin-vue'

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules'],
  },

  eslint.configs.recommended,

  ...tseslint.configs.recommended,

  ...eslintPluginVue.configs['flat/recommended'],

  {
    files: ['**/*.{ts,vue}'],

    languageOptions: {
      globals: globals.browser,
    },
  },
)