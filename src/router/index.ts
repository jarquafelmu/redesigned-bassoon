import { createRouter, createWebHistory } from 'vue-router';
import { ROUTES } from './routes';

export const routes = [ROUTES.DICTIONARY];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
