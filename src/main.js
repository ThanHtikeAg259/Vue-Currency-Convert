import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "vue-loading-overlay/dist/vue-loading.css";
import CountryFlag from 'vue-country-flag'
import Multiselect from 'vue-multiselect';

Vue.config.productionTip = false
Vue.component('country-flag', CountryFlag)
Vue.component('multiselect', Multiselect)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
