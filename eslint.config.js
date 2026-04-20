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
      'vue/multi-word-component-names': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },

  // Prettier integration (MUST be last)
  skipFormatting,
];
