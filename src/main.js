// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import router from './router'
import rootPath from './assets/config/api.js' // 接口路径
import VueResource from 'vue-resource'
import VeeValidate, { Validator } from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'
// import { cookie } from 'vux'
import { AlertPlugin, ConfirmPlugin, LoadingPlugin, cookie,Grid } from 'vux'
import VueCookie from 'vue-cookie'
Vue.component('grid', Grid);
Vue.use(AlertPlugin) // vux alert组件
Vue.use(ConfirmPlugin) // vux confirm组件
Vue.use(LoadingPlugin) // vux loading组件
Vue.use(VueCookie) // 操作cookie
Validator.addLocale(zh)
const config = {
  errorBagName: 'errors', // change if property conflicts
  fieldsBagName: 'fields',
  delay: 0,
  locale: 'zh_CN',
  dictionary: null,
  strict: true,
  classes: false,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'blur',
  inject: true,
  validity: false,
  aria: true,
  i18n: null, // the vue-i18n plugin instance,
  i18nRootKey: 'validations' // the nested key under which the validation messsages will be located
}
Vue.use(VeeValidate, config)
// import clipper from './common/js/clipper'

// Vue.use(clipper)

FastClick.attach(document.body)
// 引入vue-resource插件

Vue.use(VueResource)
// 设置请求头
// Vue.http.options.xhr = { withCredentials: true }
Vue.http.options.emulateJSON = true
Vue.http.options.headers = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
}
Vue.http.interceptors.push(function (request, next) { // 拦截器
  // 跨域携带cookie
  request.credentials = true
  request.headers.set('MC_SMS', cookie.get('MC_SMS')) // setting request.headers
  request.headers.set('MC_UID', cookie.get('MC_UID')) // setting request.headers
  next((response) => {
    return response
  })
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  data: {
    urlPath: rootPath.pathUrl() // 通过api.js 控制 开发 和线上环境
  },
  render: h => h(App)
}).$mount('#app-box')
