<template>
  <div>
    <mheader></mheader>
    <div class="clearfix proa" @click="back">
      <img class="banner" src="~@/common/img/M1.png" alt="">
      <img class="banner" src="~@/common/img/M2_01.png" alt="">
      <img class="banner" src="~@/common/img/M2_02.jpg" alt="">
      <img class="banner" src="~@/common/img/M3.png" alt="">
      <div class="dis-fl btn-out">
        <router-link class="btn" to="/purchase">发询价单</router-link>
        <button class="btn" @click.stop="toUrl">我要注册</button>
      </div>
    </div>
  </div>
</template>
<script>
  import Mheader from '@/components/base/m-header'
	import {lastPage} from '@/common/js/appFun.js'
  export default {
    components: {
      Mheader
    },
    data () {
      return {

      }
    },
    methods: {
      toUrl () {
        window.location.href = 'http://member.miningcircle.com/reg'
      },
      back () {
       	lastPage()
      }
    }
  }
</script>
<style>
   @import '../../common/styles/comm'; 
  .proa {
    position: relative;
  }
  .proa .btn-out{
    position: absolute;
    width: 100%;
    padding: 0 0.4rem;
    left: 0;
    bottom: 0.75rem;
    justify-content: space-between
  }
  .proa .btn {
    display: inline-block;
    width: 40%;
    background: #ffc847;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border: none;
    font-size: 0.16rem;
    color: #333;
    border-radius: 3px;
  }
  .banner {
    display: block;
    width: 100%;
  }
</style>
