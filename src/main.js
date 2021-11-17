import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';

Vue.config.productionTip = false

Vue.prototype.$axios = axios;
Vue.prototype.$api = 'http://localhost:4000';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue, IconsPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
