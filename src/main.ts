import Aura from '@primeuix/themes/aura';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';
import App from './App.vue';
import { i18n } from './i18n';
import router from './router';

// Styles
import 'primeicons/primeicons.css';
import './style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(i18n);
app.use(router);
app.use(PrimeVue, {
  // Default theme configuration
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark', // or '.dark' if you want manual toggle
    },
  },
});

app.mount('#app');
