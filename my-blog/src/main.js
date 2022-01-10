// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routes/routes'
import axios from 'axios'

// 全局配置
axios.defaults.baseURL = "https://my-blog-a1af4-default-rtdb.firebaseio.com"
// axios.defaults.headers.common['Authorization'] = 'Token'


Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueRouter)


// 定义主题
Vue.directive('theme', {
  bind(element, binding, vnode) {
    if (binding.value == 'wide') {
      element.style.maxWidth = "1260px";
    } else if (binding.value == 'narrow'){
      element.style.maxWidth = "560px";
    }
    if (binding.arg = 'column') {
      element.style.background = "#6677cc"
      element.style.padding = "20px"
    }
  }
})

// 自定义过滤器
// Vue.filter("to-uppercase", function(value){
//   return value.toUpperCase();
// })

Vue.filter("snippet", function(value){
  return value.slice(0,100) + "...";
})


// 使用路由
const router = new VueRouter({
  routes : Routes,
  mode: "history"
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router: router
})
