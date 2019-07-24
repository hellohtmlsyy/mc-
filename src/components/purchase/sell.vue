<template>
  <div class="sell">
    <div class="header">
      <!--<mheader></mheader>-->
      <m-header-o :icoBack="true">
      	<div slot="centerM">
      		求购单
      	</div>
      </m-header-o>
    </div>
    <div class="main_con">
      <div class="sell">
        <div class="form">
          <form @submit.prevent="validateBeforeSubmit2">
            <div class="form_section">
              <div class="form_item border-1">
                <label class="dis-fl">
                  <span>品名</span>
                  <input class="flex-1" type="text" v-model="form.title" v-validate="'required'" name="title" placeholder="必填">
                </label>
              </div>
              <p v-show="errors.has('title')" class="error">请您输入品名!</p>
              <div class="form_item border-1">
                <label class="dis-fl">
                  <span>规格</span>
                  <input class="flex-1" type="text" v-model="form.specification" v-validate="'required'" name="specification" placeholder="必填">
                </label>
              </div>
              <p v-show="errors.has('specification')" class="error">请您输入规格!</p>
              <div class="dis-fl">
                <div class="totalQuantity">
                  <div class="form_item border-1">
                    <label class="dis-fl">
                      <span>数量</span>
                      <input class="flex-1" type="tel" v-model="form.totalQuantity" v-validate="'required|numeric'" maxlength="10" name="totalQuantity" placeholder="必填">
                    </label>
                  </div>
                  <p v-show="errors.has('totalQuantity')" class="error">请您输入正确的数量!</p>
                </div>
                <div class="flex-1 unit">
                  <div class="form_item spec border-1">
                    <label class="dis-fl">
                      <span class="left">单位</span>
                      <div class="right flex-1">
                        <popup-picker :data="units" v-model="unit" :show-name="true" :value-text-align="'right'" placeholder="必填"></popup-picker>
                      </div>
                    </label>
                  </div>
                  <p v-show="unitEro" class="error">请选择单位!</p>
                </div>
              </div>
              <div class="form_item spec border-1">
                <label class="dis-fl">
                  <span class="left">商品分类</span>
                  <div class="right flex-1">
                    <popup-picker :data="kinds" v-model="firstClass" :show-name="true" :value-text-align="'right'" placeholder="必填"></popup-picker>
                  </div>
                </label>
              </div>
              <p v-show="classEro" class="error">请选择分类!</p>
              <div class="form_item spec border-1">
                <label class="dis-fl">
                  <span class="left">报价截止</span>
                  <div class="right flex-1">
                    <group>
                      <datetime placeholder="必填" v-model="form.endTime" value-text-align="right" :start-date="timeStr"></datetime>
                    </group>
                  </div>
                </label>
              </div>
              <p v-show="time1Ero" class="error">请选择报价截止时间!</p>
              <div class="form_item spec border-1">
                <label class="dis-fl">
                  <span class="left">收货地址</span>
                  <div class="right flex-1">
                    <group>
                      <popup-picker placeholder="必填" :data="addreslist" :columns="3" v-model="addval" @on-shadow-change="locaChange" :value-text-align="'right'" show-name></popup-picker>
                    </group>
                  </div>
                </label>
              </div>
              <p v-show="addEro" class="error">请选择收货地址!</p>

            </div>
            <!-- <div class="form_item spec">
              <label class="dis-fl">
                <span class="left">币种</span>
                <div class="right">
                  <popup-picker :data="currencys" v-model="currency" :show-name="true" :value-text-align="'left'" placeholder="请选择单位"></popup-picker>
                </div>
              </label>
            </div>
            <p v-show="unitEro" class="error">请选择币种!</p> -->
            <div class="form_section">
              <div class="form_item border-1">
                <label class="dis-fl">
                  <span>企业名称</span>
                  <input type="text" class="flex-1" v-model="form.purchaseCompany" v-validate="'required'" name="purchaseCompany" placeholder="必填">
                </label>
              </div>
              <p v-show="errors.has('purchaseCompany')" class="error">请您输入企业名称!</p>
              <div class="dis-fl">
                <div class="contactPerson">
                  <div class="form_item border-1">
                    <label class="dis-fl">
                      <span>联系人</span>
                      <input type="text" class="flex-1" v-model="form.contactPerson" v-validate="'required'" name="contactPerson" placeholder="必填">
                    </label>
                  </div>
                  <p v-show="errors.has('contactPerson')" class="error">请您输入联系人!</p>
                </div>
                <div class="flex-1 contactNumber">
                  <div class="form_item border-1">
                    <label class="dis-fl">
                      <span>电话</span>
                      <input type="tel" class="flex-1" v-model="form.contactNumber" v-validate="'required|mobile'" name="phone" placeholder="必填">
                    </label>
                  </div>
                  <p v-show="errors.has('phone')" class="error">请输入正确的电话号码！</p>
                </div>
              </div>
              <div class="isMobile">
                <group class="isShow">
                  <x-switch :title="'报价后是否显示手机号码'" :value-map="[0, 1]" v-model="form.mobileShow"></x-switch>
                </group>
                <span class="or_text">{{form.mobileShow > 0 ? '是' : '否'}}</span>
              </div>
            </div>
            <div class="form_section">
              <div class="more" @click="boxshow = !boxshow" v-show="!boxshow"><span>点击查看更多信息(选填)</span></div>
              <div class="more more2" @click="boxshow = !boxshow" v-show="boxshow"><span>点击收起更多信息(选填)</span></div>
              <transition name="mybox">
                <div ref="box" class="box" v-show="boxshow">
                  <div class="form_item spec border-1">
                    <label class="dis-fl">
                      <span class="left">预收货日</span>
                      <div class="right flex-1">
                        <group>
                          <datetime placeholder="选填" v-model="form.deliveryTime" value-text-align="right"></datetime>
                        </group>
                      </div>
                    </label>
                  </div>
                  <div class="form_item remark border-1">
                    <label class="dis-fl">
                      <span>备注</span>
                      <input class="flex-1" type="text" v-model="form.remarks" maxlength="200" placeholder="选填">
                    </label>
                  </div>
                  <divider>最多输入200个字符！</divider>
                </div>
              </transition>
            </div>
            <button class="submit fixed" type="submit">提交</button>
          </form>
          <div></div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import Mheader from '@/components/base/m-header'
  import { Validator } from 'vee-validate'
  import { Datetime, Group, PopupRadio, PopupPicker, Divider,XSwitch,cookie} from 'vux'
  import mHeaderO from '@/components/base/mHeaderO'
  import { reg } from '@/common/js/reg'
  Validator.extend('mobile', reg.ismobile)
  export default {
    data () {
      return {
        addreslist: [],
        addval: [],
        // currencys: [[{
        //   name: 'CNY人民币',

        // }]],
        units: [[{
          name: '吨',
          value: '吨'
        }, {
          name: '千克',
          value: '千克'
        }, {
          name: '克',
          value: '克'
        }, {
          name: '方',
          value: '方'
        }, {
          name: '台',
          value: '台'
        }, {
          name: '辆',
          value: '辆'
        }, {
          name: '个',
          value: '个'
        }, {
          name: '件',
          value: '件'
        }, {
          name: '套',
          value: '套'
        }, {
          name: '组',
          value: '组'
        }]],
        kinds: [[{
          name: '贵金属矿产',
          value: '1'
        }, {
          name: '有色金属',
          value: '2'
        }, {
          name: '黑色金属',
          value: '4'
        }, {
          name: '能源矿产',
          value: '8'
        }, {
          name: '稀有金属',
          value: '16'
        }, {
          name: '非金属',
          value: '32'
        }, {
          name: '矿用设备',
          value: '64'
        }, {
          name: '耗材药剂',
          value: '128'
        }, {
          name: '专业服务',
          value: '256'
        }]],
        show1: false,
        value1: [],
        time1: '',
        unit: [],
        firstClass: [],
        form: {
          title: '', // 品名
          specification: '',
          totalQuantity: '',
          unit: '',
          firstClass: '',
          remarks: '',
          endTime: '',
          country: '',
          province: '',
          city: '',
          deliveryTime: '',
          contactPerson: '',
          purchaseCompany: '',
          contactNumber: '',
          mobileShow: 1,
          'MC_UID':''
        },
        timeStr: '',
        unitEro: false,
        classEro: false,
        time1Ero: false,
        addEro: false,
        boxshow: false,
        mc_uid:cookie.get("MC_UID")
      }
    },
    components: {
      Mheader,
      Datetime,
      Group,
      PopupRadio,
      PopupPicker,
      Divider,
      XSwitch,
      mHeaderO
    },
    created () {
      const nowDate = new Date()
      const year = nowDate.getFullYear()
      const month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1
      const day = nowDate.getDate() < 10 ? '0' + (nowDate.getDate() + 1) : nowDate.getDate()
      const dateStr = year + '-' + month + '-' + day
      this.timeStr = dateStr
      const timeNow = new Date().getTime()
      this.$http.get(this.$root.urlPath.MJK + '/wap/purchase/getCompanyInfo?t=' + timeNow + '&MC_UID='+this.mc_uid).then(function (res) {
        console.log(res)
        if (res.body.success) {
          this.info = res.body.data
          this.form.contactPerson = this.info.contactName
          this.form.contactNumber = this.info.mobile
          this.form.purchaseCompany = this.info.name
        }
      })
      this.$http.get(this.$root.urlPath.MJK + '/wap/purchase/getLocation').then(function (res) {
        if (res.body.success) {
          var addArr = []
          res.body.data.forEach((item, index) => {
            addArr[index] = {
              name: item.areaname,
              value: item.id,
              parent: 0
            }
          })
          this.addreslist = addArr
        }
      })
      if (this.$route.query.id) {
        this.id = this.$route.query.id
        var uid = cookie.get("MC_UID")
        this.$http.get(this.$root.urlPath.MJK + '/wap/purchase/getPurchaseDetail?purchaseId=' + this.id+'&MC_UID='+uid).then(function (res) {
          if (res.body.success) {
            this.Info = res.body.data
            this.form.title = this.Info.title
            this.form.specification = this.Info.specification
            this.form.totalQuantity = this.Info.totalQuantity
            this.unit = [this.Info.unit] // 单位回显
            // this.addval = [this.Info.address, '', ''] // 地址回显
            this.form.unit = this.Info.unit
            this.form.firstClass = this.Info.firstClass
            this.form.remarks = this.Info.remarks
            this.form.endTime = this.Info.endTime
            this.form.deliveryTime = this.Info.deliveryTime
            this.form.contactPerson = this.Info.contactPerson
            this.form.purchaseCompany = this.Info.purchaseCompany
            this.form.contactNumber = this.Info.contactNumber
          } else {
          }
        })
      }
      this.form.MC_UID = cookie.get('MC_UID')
    },
    methods: {
      getlocation (id) {
        this.$http.get(this.$root.urlPath.MJK + '/wap/purchase/getLocation?pId=' + id).then(function (res) {
          if (res.body.success) {
            var addArr = []
            var arr = res.body.data
            arr.forEach((item, index) => {
              addArr[index] = {
                name: item.areaname,
                value: item.id,
                parent: id
              }
            })
            this.addreslist = this.addreslist.concat(addArr)
          }
        })
      },
      locaChange (val) {
        var id = ''
        if (val.length === 1) {
          id = val[0]
        }
        if (val.length === 2) {
          id = val[1]
        }
        if (val.length > 2) {
          var index = val.findIndex((item, index) => {
            return item == null
          })
          if (!index) {
            return
          }
          console.log(index + '=====')
          id = val[index - 1]
        }
        this.getlocation(id)
      },
      validateBeforeSubmit2 () {
        console.log(this.firstClass[0], this.addval)
        this.form.unit = this.unit[0]
        this.form.firstClass = this.firstClass[0]
        this.unitEro = !this.form.unit
        this.classEro = !this.form.firstClass
        this.time1Ero = !this.form.endTime
        this.addEro = !this.addval[0]
        this.form.country = this.addval[0]
        this.form.province = this.addval[1]
        this.form.city = this.addval[2]
        if (!this.unitEro && !this.classEro && !this.time1Ero && !this.time2Ero && !this.addEro) {

        } else {
          return
        }
        this.$validator.validateAll().then((result) => {
          var _this = this
          if (result) {
            const params = this.form
            _this.$vux.confirm.show({
              content: '是否提交求购单信息？',
              onCancel () {
                console.log(params)
              },
              onConfirm () {
                _this.$http.get(_this.$root.urlPath.MJK + '/wap/save/savePurchases', {params: params}).then(function (res) {
                  if (res.body.success) {
                    this.$vux.alert.show({
                      title: '发布成功',
                      content: '资料已提交，如果有客户报价，我们会以短信的方式发送至您的手机',
                      onHide () {
                         window.location.href = _this.$root.urlPath.MCM + "/purchase?newpage=newpage";
                      }
                    })
                  } else {
                    alert(res.body.errMsg)
                  }
                })
              }
            })
          }
          console.log(this.errors)
        })
      },
      back () {
        this.$router.go(-1)
      },
      onShow () {

      },
      onHide () {

      },
      onChange () {

      },
      submit () {
      }
    }
  }
</script>
<style>
  @import '../../common/styles/comm';
  @import '../../common/styles/main';
  .sell .header{
  	background: #00a5f5;
  }
  .main_con{
    padding: 45px 0 45px;
  }
  .totalQuantity{
    width: 60%;
    padding-right: 20px;
  }
  .sell .spec label{
    padding: 0.05rem;
    display:-webkit-box;
    display:-webkit-flex;
    display: -moz-box;
    display:-ms-flexbox;
    display:flex;
  }
  .sell .spec .right{
    position: relative;
    top: -2px;
    width: 70%;
    font-size: 0.14rem
  }
  .sell .right .weui-cell{
    padding: 2px 5px;
  }
  .sell .weui-cells{
    font-size: 0.15rem
  }
  .sell .weui-cells::before, .sell .weui-cells::after{
    display: none
  }

  .sell .vux-no-group-title, .sell .weui-cells{
    margin-top: 0;
  }
  .sell .weui-cell_access .weui-cell__ft::after{
    display: none
  }
  .submit:active, .submit:focus, .submit:hover{
    background: #6fb9f8;
  }
  /* .sell .totalQuantity .form_item span, .unit .form_item span{
    width: 0.6rem;
  } */
  .isShow .weui-label{
    font-size: 0.14rem;
    color: #565656;
  }
  .isShow .vux-x-switch.weui-cell_switch{
    padding: 0px 0.07rem
  }
  .contactPerson{
    width: 54%;
    padding-right: 20px;
  }
  .sell .contactNumber span{
    width: 0.4rem;
  }
  .form_section .more{
    text-align: center;
    color: #8a8a8a;
  }
  .form_section .more span{
    display: inline-block;
    padding-right: 22px;
    background: url('../../common/img/icon7.png') right center no-repeat;
  }
  .form_section .more2 span{
    background: url('../../common/img/icon6.png') right center no-repeat;
  }
  .box{
    height: 128px;
    overflow: hidden;
    font-size: 12px;
  }
  .mybox-leave-active,.mybox-enter-active{
      transition:  all .6s ease;
  }
  .mybox-leave-active,.mybox-enter{
      height:0px !important;
  }
  .isMobile{
    position: relative;
  }
  .isMobile .or_text{
    position: absolute;
    right: 0.7rem;
    bottom: 0.05rem;
    font-size: 0.14rem;
    color: #565656;
  }
</style>

