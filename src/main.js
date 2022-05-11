import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CountryFlag from 'vue-country-flag'

Vue.config.productionTip = false
Vue.component('country-flag', CountryFlag)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
