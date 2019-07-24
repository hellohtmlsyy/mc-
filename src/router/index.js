import Vue from 'vue'
import Router from 'vue-router'
import { cookie } from 'vux'
const HelloWorld = () => import('@/components/HelloWorld')
const Purchase = () => import('@/components/purchase/purchase')
const Detail = () => import('@/components/purchase/detail')
const Cert = () => import('@/components/purchase/cert')
const Sell = () => import('@/components/purchase/sell')
const Buy = () => import('@/components/purchase/buy')
const Proa = () => import('@/components/purchase/propaganda')
// const test = () => import('@/components/purchase/test')


// import HelloWorld from '@/components/HelloWorld'
// import Purchase from '@/components/purchase/purchase'
// import Detail from '@/components/purchase/detail'
// import Cert from '@/components/purchase/cert'
// import Sell from '@/components/purchase/sell'
// import Buy from '@/components/purchase/buy'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect: '/purchase'
    },
    {
      path: '/purchase',
      name: 'purchase',
      component: Purchase
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/cert',
      name: 'cert',
      component: Cert
    },
    {
      path: '/sell',
      name: 'sell',
      component: Sell,
      meta: { requireAuth: true }
    },
    {
      path: '/buy',
      name: 'buy',
      component: Buy
    },
    {
      path: '/proa',
      name: 'proa',
      component: Proa
    }
    // ,{
    //   path: '/test',
    //   name: 'test',
    //   component: test
    // }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (cookie.get('MC_UID')) {  // 获取当前的token是否存在
//  	alert()
      console.log(cookie.get('MC_UID'))
      next()
    } else {
      // next({
      window.location.href = 'http://member.miningcircle.com/login'
      // })
    }
  } else {
    next()
  }
})
export default router
