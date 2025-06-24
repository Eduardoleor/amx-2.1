const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const prettierPlugin = require('eslint-plugin-prettier')
const globals = require('globals')

// Create safe globals without problematic entries
const safeGlobals = { ...globals.browser, ...globals.es2021 }
Object.keys(safeGlobals).forEach((key) => {
  if (key.trim() !== key) delete safeGlobals[key]
})

module.exports = defineConfig([
  ...expoConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'es5',
          printWidth: 100,
        },
      ],
    },
  },
  {
    ignores: [
      '**/*.json',
      '**/*.md',
      'dist/**',
      '*.d.ts',
      'node_modules/**',
      'coverage/**',
      'expo-env.d.ts',
      '.expo/**',
      '.expo-shared/**',
      'web-build/**',
      '*.log',
    ],
  },
])
