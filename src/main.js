/* jshint esversion: 6 */
import Vue from 'vue'
import App from './App'

// 引用路由
import router from './router/index'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueLazyload from 'vue-lazyload'
import loading from './common/img/loading.gif'
// 全局过滤器
import '@/config/filters'
import 'bootstrap/dist/css/bootstrap.css'

// 引用ElementUI框架
Vue.use(ElementUI)
// 配置图片懒加载
Vue.use(VueLazyload,
  {
    loading
  })
Vue.config.productionTip = false

new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App)
});
