// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api/index.js'
import VueLazyLoad from 'vue-lazyload'
import './assets/font/css/font-awesome.css'

Vue.use(VueLazyLoad,{
    error:'https://www.tengyu.site/h5/images/placeholder.jpg',
    loading:'https://www.tengyu.site/h5/images/placeholder.jpg'
})
Vue.config.productionTip = false
Vue.prototype.$api = api
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
