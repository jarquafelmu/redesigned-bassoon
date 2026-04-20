import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      vue(),
      tailwindcss(),
      Components({
        resolvers: [PrimeVueResolver()],
      }),
    ],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_RAPIDAPI_URL,
          changeOrigin: true,
          secure: false, // Prevents SSL verification errors,
          rewrite: (path) => path.replace(/^\/api/, ''),
          headers: {
            'X-RapidAPI-Host': env.VITE_RAPIDAPI_HOST || '',
            'X-RapidAPI-Key': env.VITE_RAPIDAPI_KEY || '',
          },
        },
      },
    },
  };
});
