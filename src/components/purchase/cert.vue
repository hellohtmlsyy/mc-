<template>
  <div class="cert">
    <div class="header">
      <!--<mheader></mheader>-->
      <m-header-o :icoBack="true">
      	<div slot="centerM">
      		企业认证
      	</div>
      </m-header-o>
    </div>
    <div class="main_con">
      <div class="sell cert">
        <div class="form">
          <form @submit.prevent="validateBeforeSubmit">
            <div class="form_section">
              <div class="form_item border-1">
                <label class="dis-fl">
                  <span class="span">企业名称</span>
                  <input class="flex-1" type="text" v-model="form.name" v-validate="'required'" maxlength="15" name="name">
                </label>
              </div>
              <p v-show="errors.has('name')" class="error">请您输入企业名称!</p>
              <div class="form_item border-1">
                <label class="dis-fl">
                  <span class="span">联系人</span>
                  <input  class="flex-1" type="text" v-model="form.contactName" v-validate="'required'" name="contactName">
                </label>
              </div>
              <p v-show="errors.has('contactName')" class="error">请您输入联系人!</p>
              <div class="form_item kinds border-1">
                <label class="dis-fl">
                  <span class="left span">经营种类</span>
                  <div class="right flex-1">
                    <popup-picker :data="list1" v-model="value1" :show-name="true" :value-text-align="'right'" placeholder="请选择矿种分类"></popup-picker>
                  </div>
                </label>
              </div>
              <p v-show="kindEro" class="error">请选择经营种类!</p>
              <div class="form_item spec border-1">
                <label class="dis-fl">
                  <span class="span">统一社会信用代码</span>
                  <input  class="flex-1" type="text" v-model="form.businessNo" v-validate="'required'" name="businessNo">
                </label>
              </div>
              <p v-show="errors.has('businessNo')" class="error">请您输入统一社会信用代码!</p>
            </div>
            <div class="form_section">
              <div class="form_item logo">
                <div class="uplogo">
                  <p class="tit">企业logo</p>
                  <div class="text-center">
                    <crope @imgUrl="getUrl"></crope>
                  </div>
                </div>
              </div>
            </div>
            <button class="submit" type="submit" :disabled="disabled">提交</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Mheader from '@/components/base/m-header'
  import {lastPage} from '@/common/js/appFun.js'
  import { PopupPicker} from 'vux'
  import Crope from '@/components/base/crop'
  import mHeaderO from '@/components/base/mHeaderO'
  export default {
    components: {
      Mheader,
      PopupPicker,
      Crope,
      mHeaderO
    },
    data () {
      return {

        list1: [[{
          name: '金属矿产',
          value: '1'
        }, {
          name: '有色金属',
          value: '2'
        }, {
          name: '黑色金属',
          value: '4'
        }, {
          name: '能矿矿产',
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
          key: '256',
          value: '专业服务'
        }]],
        value1: [],
        form: {
          name: '',
          contactName: '',
          industry: '',
          businessNo: '',
          logo: ''
        },
        kindEro: false,
        info: '',
        disabled:false
      }
    },
    created () {

      if (this.$cookie.get('MC_UID')) {
        this.$http.get(this.$root.urlPath.MC + '/wap/selectCompanyAndLang').then(function (res) {
          if (res.body.success) {
            this.info = res.body.data
            this.form.name = this.info.name
            this.form.contactName = this.info.contactName
            this.form.industry = this.info.industry
            this.form.businessNo = this.info.businessNo
          } else {
          }
        })
      } else {
        window.location.href = 'http://member.miningcircle.com/login'
      }
    },
    methods: {
      getUrl (url) {
        this.form.logo = url
        console.log(url)
      },
      validateBeforeSubmit () {
        this.disabled = true
        this.form.industry = this.value1[0]
        this.kindEro = !this.form.industry
        if (this.kindEro) {
          return
        }
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$vux.loading.show({
              text: 'Loading'
            })

            const params = this.form
            this.$http.get(this.$root.urlPath.MC + '/wap/WapSaveCompany', {params: params}).then(function (res) {
              if (res.body.success) {
								if (this.$route.query.spread) {
									const params2 = {
										'activityNo': '20181228',
										'activityDesc': '矿业圈入驻推广',
										'spread': 'true'
									}

									this.$http.post(this.$root.urlPath.MC + '/wap/activity/activitySubmit', params2).then(function(res) {
                    this.$vux.loading.hide()
                    if (res.data.success) {
											window.location.href = this.$root.urlPath.MCMAPP + '/act/act2018122003';
										} else {
											alert(res.data.errMsg)
										}
									})
								} else {
                  this.$vux.loading.hide()
									lastPage()
								}
              } else {
                this.$vux.loading.hide()
                this.disabled = false
                alert(res.body.errMsg)
              }
            })
          }
          console.log(this.errors)
        })
      },
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>
<style>
  /* @import '../../common/styles/cropeImg'; */
  @import '../../common/styles/comm';
  @import '../../common/styles/main';
  .cert .header{
  	background: #00a5f5;
  }
  .main_con{
    padding: 45px 0 0 0;
  }
  .cert .spec .span{
    width: 45%
  }
  .cert .spec input{
    width: 40%
  }
  .submit:active, .submit:focus, .submit:hover{
    background: #6fb9f8;
  }
  .cert .kinds label{
    padding: 0.05rem;
    display:-webkit-box;
    display:-webkit-flex;
    display: -moz-box;
    display:-ms-flexbox;
    display:flex;
  }
  .cert .kinds .left{
    width: 23%
  }
  .cert .kinds .right{
    position: relative;
    padding-left: 0.05rem;
    top: 2px;
    width: 60%;
    font-size: 0.14rem
  }
  .cert .right .weui-cell{
    padding: 2px 5px;
  }
  .cert .form_item .tit{
    font-size: 0.15rem;
    width: 0.8rem
  }
  .cert .uplogo{
    padding: 0.08rem;
  }
  .cert .logo {
    height: auto;
  }
</style>

