import type { RouteRecordRaw } from 'vue-router';

type RoutesConfig = {
  DICTIONARY: RouteRecordRaw;
};

export const ROUTES: RoutesConfig = {
  DICTIONARY: {
    path: '/',
    name: 'dictionary',
    component: () => import('../views/DictionaryView.vue'),
  },
} as const;

export type DictionaryQuery = {
  word?: string;
  partOfSpeech?: string;
};
