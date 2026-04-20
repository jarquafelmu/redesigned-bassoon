import { createFetch } from '@vueuse/core';

export const useRapidFetch = createFetch({
  baseUrl: '/api/words', // Points to our proxy + base api path
  options: {
    async beforeFetch({ options }) {
      // We don't need headers here anymore
      // Vite's proxy injects them for us safely.

      return { options };
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
});
