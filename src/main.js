import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import config from './config';

Vue.config.productionTip = false;

Vue.prototype.$backendUrl = config.backendUrl;

createApp(App).use(router).mount('#app');
