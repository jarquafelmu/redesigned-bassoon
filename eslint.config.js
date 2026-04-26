import pluginVue from 'eslint-plugin-vue';
import vueTsConfig from '@vue/eslint-config-typescript';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default [
  // Global ignores
  {
    ignores: ['dist', 'node_modules', 'public'],
  },

  // Base configurations
  ...pluginVue.configs['flat/essential'],
  ...vueTsConfig(),

  // Custom Rules
  {
    files: ['**/*.{ts,mts,tsx,vue}'],
    rules: {
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['App', 'index'],
        },
      ],
      '@typescript-eslint/no-unused-vars': 'warn',
    },
    overrides: [
      {
        // Target only the files inside your pages or views folder
        files: ['src/pages/**/*.vue', 'src/views/**/*.vue'],
        rules: {
          'vue/multi-word-component-names': 'off',
        },
      },
    ],
  },

  // Prettier integration (MUST be last)
  skipFormatting,
];
