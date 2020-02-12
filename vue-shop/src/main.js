import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/assets/css/global.css'
Vue.config.productionTip = false
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true
axios.defaults.baseURL = "http://192.168.0.103:3000"
Vue.prototype.$http = axios;
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')