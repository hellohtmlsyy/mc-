<template>
  <div class="purch-detail">
    <div class="header">
      <!--<mheader></mheader>-->
      <m-header-o :icoBack="true">
      	<div slot="centerM">
      		求购单详情
      	</div>
      </m-header-o>
    </div>
    <div class="main_con">
      <div class="bg-color">
        <loading :show="!Info" :text="'加载中...'"></loading>
        <div class="section1">
          <div class="tit1">产品信息</div>
          <div class="num">
            求购单号:{{Info.purchaseNo}}
          </div>
   
          <div class="list">
            <span class="left">品名</span>
            <span class="right">{{Info.title}}</span>
          </div>
          <div class="list">
            <span class="left">规格</span>
            <span class="right">{{Info.specification}}</span>
          </div>
          <div class="list">
            <span class="left">数量</span>
            <span class="right">{{Info.totalQuantity}}{{Info.unit}}</span>
          </div>
          <div class="list">
            <span class="left">备注</span>
            <div class="pull-left right">
              <span class="look" @click="boxshow = !boxshow" v-show="!boxshow">点击查看</span>
              <span class="look" @click="boxshow = !boxshow" v-show="boxshow">点击收起</span>
              <transition name="mybox">
                <!-- <div  ref="box_out"> -->
                  <p ref="box" class="box" v-show="boxshow">{{Info.remarks}}</p>
                <!-- </div> -->
              </transition>

            </div>
            <!-- <span ></span> -->
          </div>
        </div>
        <div class="section1">
          <div class="tit2">状态信息</div>
          <div class="list">
            <span class="left">报价截止</span>
            <span class="right">{{Info.endTime}}</span>
          </div>
          <div class="list">
            <span class="left">收货地址</span>
            <span class="right">{{Info.address}}</span>
          </div>
          <div class="list">
            <span class="left">预收货日</span>
            <span class="right">{{Info.deliveryTime}}</span>
          </div>
        </div>
        <div class="section1">
          <div class="tit3">联系人信息</div>
          <div class="list">
            <span class="left">联系人</span>
            <span class="right">{{Info.contactPerson}}</span>
          </div>
          <div class="list">
            <span class="left">联系电话</span>
            <span class="right">
              <a href="javascript:;" style="color: #333" v-show="!mobileShow">{{mobile}}</a>
              <a :href="'tel:' + mobile" class="col-pri" v-show="mobileShow">{{mobile}}</a>
              
              	<span class="col-pri pull-right" v-show="mobileShow" @click="toPhone(mobile)">拨打电话</span>
              <a href="javascript:;" v-show="!mobileShow" class="pull-right" style="color:#333">（报价后可见）</a>
            </span>
          </div>
          <div class="list">
            <span class="left">企业名称</span>
            <span class="right">{{Info.purchaseCompany}}</span>
          </div>
        </div>
        <div class="fixed">
          <div class="dis-fl">
            <div class="left">
              <p>报价剩余时间</p>
              <p class="remain_time"><span>{{Info.remainingTime}}</span></p>
            </div>
            <div class="flex-1 right">
              <div class="buy" :class="{'agree': status === 2 && Info.status === 5}" @click="iStatus">我要报价</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import Mheader from '@/components/base/m-header'
  import mHeaderO from '@/components/base/mHeaderO'
  import { Loading, Alert,cookie} from 'vux'
  export default {
    components: {
      Mheader,
      Loading,
      Alert,
      mHeaderO
    },
    data () {
      return {
        Info: '',
        mobile: '',
        orderStatus: '',
        status: '',
        showAlert: false,
        errMsg: '',
        errCode: '',
        boxshow: false,
        mobileShow: false,
       	mc_uid:cookie.get("MC_UID")
      }
    },
    created () {
      this.id = this.$route.query.id
      var uid = cookie.get("MC_UID")
      this.$http.get(this.$root.urlPath.MJK + '/wap/purchase/getPurchaseDetail?purchaseId=' + this.id+'&MC_UID='+uid).then(function (res) {
        if (res.body.success) {
          this.Info = res.body.data
          if (this.Info.isMine === 1) {
            this.mobile = this.Info.contactNumber
          } else {
            if (this.Info.mobileShow > 0 && this.Info.isOffer === 1) {
              this.mobile = this.Info.contactNumber
              this.mobileShow = true
            } else {
              this.mobile = this.Info.contactNumber.substring(0, 3) + '****' + this.Info.contactNumber.substring(7, 11)
            }
          }
        } else {
        }
      })
      this.$http.get(this.$root.urlPath.MJK + '/wap/purchase/getCompanyInfo?purchaseId=' + this.id+'&MC_UID='+this.mc_uid).then(function (res) {
        if (res.body.success) {
          this.status = res.body.data.status
        } else {
          this.errMsg = res.body.errMsg
          this.errCode = res.body.errCode
        }
      })
    },
    mounted () {
    },
    methods: {
      iStatus () {
        const _this = this
        if (this.errCode === '002001037') {
          this.$vux.alert.show({
            title: '提示',
            content: '您尚未登录',
            onHide () {
              window.location.href = 'http://member.miningcircle.com/login?redirectTo=http://trade.miningcircle.com'
            }
          })
        } else {
          if (this.errCode === '002001045' || this.errCode === '002001048') {
            this.$vux.alert.show({
              title: '提示',
              content: this.errMsg,
              onHide () {
                window.location.href = "http://trade.miningcircle.com/cert?newpage=newpage";
              }
            })
          } else {
            if (this.status === 2 && this.Info.status === 5) {  
              window.location.href = this.$root.urlPath.MCM + "/buy?newpage=newpage&purchaseId=" + this.id + '&unit=' + encodeURIComponent(this.Info.unit) + '&max=' +this.Info.totalQuantity ;
            } else {
              if (this.Info.status === 2) {
                this.$vux.alert.show({
                  title: '提示',
                  content: '该求购单已下线'
                })
              } else if (this.Info.status === 3) {
                this.$vux.alert.show({
                  title: '提示',
                  content: '该求购单到期已下线'
                })
              } else if (this.Info.status === 4) {
                this.$vux.alert.show({
                  title: '提示',
                  content: '该求购单已下线'
                })
              } else if (this.Info.status === 6) {
                this.$vux.alert.show({
                  title: '提示',
                  content: '该求购单已完成'
                })
              } else {
                this.$vux.alert.show({
                  title: '提示',
                  content: this.errMsg
                })
              }
            }
          }
        }
      },
      back () {
        this.$router.go(-1)
      },
      toPhone(tel){
      	var u = navigator.userAgent
      	var adrDevice = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //安卓设备
      	if(adrDevice){
      		var params = '{"tel":tel}'
      		adwebkit.callApp("CALL", params)
      	}else{
      		window.location.href = "tel:" + tel
      	}
      }
    }
  }
</script>
<style scope>
   @import '../../common/styles/comm';
   @import '../../common/styles/main';
   .purch-detail .header{
   		background: #00a5f5;
   }
   .numberr{
          pointer-events:none;
        }

    .main_con{
      padding: 45px 0 50px;
    }
   .bg-color{
     padding: 0.05rem;
     background: #dcdcdc;
     color: #333
   }
   .title{
     position: relative;
     background: #00a5f5;
     font-size: 0.14rem;
     padding: 0.1rem;
     text-align: center;
     color: #fff
   }
   .title .back{
     position: absolute;
     width: 0.3rem;
     height: 0.3rem;
     left: 0.12rem;
     top: 5px;
   }
   .section1{
     background: #fff;
     padding: 0.1rem 0.15rem;
     border-radius: 8px;
   }
   .tit1,.tit2,.tit3{
      color: #00a5f5;
      padding-left: 25px;
      font-size: 0.16rem;
      font-weight: bolder;
     background: url(../../common/img/icon1.png) left center no-repeat;
   }
   .tit2{
     background: url(../../common/img/icon2.png) left center no-repeat;
   }
   .tit3{
     background: url(../../common/img/icon3.png) left center no-repeat;
   }
   .num{
     background: #eee;
     margin: 0.08rem 0 0 0;
     padding: 0.03rem 0 0 0.25rem;
     border-radius: 0 0 5px 5px;
     font-size: 0.14rem;
     border: 1px solid #d2d2d2
   }
   .section1+.section1{
     margin-top: 0.05rem;
   }
   .section1 .list{
     overflow: hidden;
     padding: 0.08rem 0 0.03rem 0.25rem;
     font-size: 0.14rem;
   }
   .list+.list{
     border-top: 1px solid #d2d2d2
   }
   .section1 span{
     float: left;
   }
   .section1 .left {
     width: 25%;
   }
   .section1 .right{
     width: 75%
   }
   .fixed{
     position: fixed;
     bottom: 0;
     left: 0;
     width: 100%;
     height: 50px;
   }
   .fixed .dis-fl{
      align-items: center;
      text-align: center;
      font-size: 0.14rem;
      color: #fff;
   }
   .fixed .left{
     width: 1.7rem;
     height: 50px;
     padding: 0.03rem;
     background: #ff9f00;
   }
   .fixed .right{
     height: 50px;
     line-height: 50px;
      background: #a0a0a0;
     color: #fff
   }
   .fixed .right .buy {
     display: inline-block;
     height: 100%;
     width: 100%;
     color: #fff
   }
   .agree{
     background: #1593ff;
   }
   .box{
      float: left;
      height: 95px;
      overflow: scroll;
      font-size: 12px;
    }
    .look{
      float: left;
      width: 100%;
      color: #1593ff;
    }
   .mybox-leave-active,.mybox-enter-active{
      transition:  all .6s ease;
    }
    .mybox-leave-active,.mybox-enter{
      height:0px !important;
    }
    .mybox-leave,.mybox-enter-active{
        /* height: 95px; */
    }
    .remain_time span{
      display: inline-block;
      padding-left: 20px;
      background: url('../../common/img/time.png') left center no-repeat
    }
</style>




