<template>
  <div class="buy">
    <div class="header">
      <!--<mheader></mheader>-->
      <m-header-o :icoBack="true">
      	<div slot="centerM">
      		报价单
      	</div>
      </m-header-o>
    </div>
    <!-- <div class="title"><img class="back" src="~@/common/img/back.png" @click="back" alt="">报价单</div> -->
    <div class="main_con">
      <div class="cert sell">
        <div class="form">
          <form @submit.prevent="validateBeforeSubmit">
            <div class="form_section">
              <div class="form_item border-1">
                <label class="dis-fl">
                  <span>企业名称</span>
                  <input type="text" class="compname flex-1" readonly v-model="form.offerCompany" placeholder="必填">
                </label>
              </div>
              <div class="form_item border-1">
                <label class="dis-fl">
                  <span>报价人</span>
                  <input class="flex-1" type="text" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('email') }" name="offerName" v-model="form.offerName" placeholder="必填">
                </label>
              </div>
              <p v-show="errors.has('offerName')" class="error">请您输入报价人!</p>
              <div class="form_item border-1">
                <label class="dis-fl">
                  <span>联系电话</span>
                  <input class="flex-1" type="tel" v-model="form.contactNumber" v-validate="'required|mobile'" name="contactNumber" placeholder="必填">
                </label>
              </div>
              <p v-show="errors.has('contactNumber')" class="error">请您输入正确的联系电话!</p>
            </div>
            <div class="form_section">
              <div class="form_item border-1">
                <label class="dis-fl">
                  <span>单价</span>
                  <input class="flex-1" type="tel" v-model="form.price" v-validate="'required|numeric'" name="price" >元
                </label>
              </div>
              <p v-show="errors.has('price')" class="error">请您输入正确的价格!</p>
              <div class="form_item border-1">
                <label class="dis-fl">
                  <span>最小量</span>
                  <input class="flex-1" type="tel" v-model="form.minQuantity" v-validate="'required|numeric'" name="min">{{unit}}
                </label>
              </div>
              <p v-show="errors.has('min')" class="error">请您输入正确的数量!</p>
              <p v-show="minerror" class="error">您输入已超过最大量!</p>
              <div class="form_item border-1">
                <label class="dis-fl">
                  <span>最大量</span>
                  <input class="flex-1" type="tel" v-model="form.maxQuantity" v-validate="'required|numeric'" name="max">{{unit}}
                </label>
              </div>
              <p v-show="maxerror" class="error">您输入的最大量小于最小量!</p>
              <divider>求购方最大量为&emsp;{{query.max}}{{unit}}</divider>
              <p v-show="errors.has('max')" class="error">请您输入正确的最大量!</p>
              <div class="form_item border-1">
                <label class="dis-fl">
                  <span>备注</span>
                  <input class="flex-1" type="text"  v-model="form.remarks" maxlength="200">
                </label>
              </div>
              <divider>最多输入200个字符！</divider>
              <div class="up-file dis-fl form_item">
                <div class="label">
                  <label for="file">上传附件</label>
                </div>
                <div class="file dis-fl">
                  <img src="../../common/img/icon4.png" alt="">
                  <input type="file" id="file" class="files" ref="file" accept=""  @change="fileChange()"><p class="filename">{{filename}}</p>
                </div>
              </div>
            </div>
            <toast v-model="show1" type="text">上传成功！</toast>
            <button class="submit">提交</button>
          </form>
          <!-- <toast v-model="show1" :time="1500" width="9em" text="报价成功"></toast> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Mheader from '@/components/base/m-header'
  import { Validator } from 'vee-validate'
  import { PopupPicker, Divider, Toast, XHeader,cookie} from 'vux'
  import mHeaderO from '@/components/base/mHeaderO'

  Validator.extend('mobile', {
    messages: {
      en: field => field + '必须是11位手机号码'
    },
    validate: value => {
      return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    }
  })
  export default {
    components: {
      Mheader,
      PopupPicker,
      Toast,
      Divider,
      XHeader,
      mHeaderO
    },
    data () {
      return {
        form: {
          purchaseId: '',
          offerCompany: '',
          offerName: '',
          contactNumber: '',
          price: '',
          minQuantity: '',
          maxQuantity: '',
          unit: '',
          remarks: '',
          attach: '',
          "MC_UID":''
        },
        query: '',
        unit:decodeURIComponent(this.$route.query.unit),
        info: {},
        minerror: false,
        maxerror: false,
        show1: false,
        filename: '',
        mc_uid:cookie.get("MC_UID")
      }
    },
    created () {
       this.query = this.$route.query
       
      this.$http.get(this.$root.urlPath.MJK + '/wap/purchase/getCompanyInfo?purchaseId=' + this.query.purchaseId+'&MC_UID='+this.mc_uid).then(function (res) {
        if (res.body.success) {
          this.info = res.body.data
          this.form.unit = decodeURIComponent(this.query.unit)
          this.form.purchaseId = this.query.purchaseId
          this.form.offerCompany = this.info.name
          this.form.contactNumber = this.info.mobile
        }
      })
      
      this.form.MC_UID = cookie.get("MC_UID")
    },
    computed: {
      max () {
        return this.form.maxQuantity
      },
      min () {
        return this.form.minQuantity
      }
    },
    watch: {
      min (val) {
        parseInt(this.min) > parseInt(this.query.max) && parseInt(this.min) > parseInt(this.max) ? this.minerror = true : this.minerror = false
      },
      max (val) {
        parseInt(this.min) > parseInt(this.max) ? this.maxerror = true : this.maxerror = false
      }
    },
    methods: {
      fileChange (e) {
        console.log(this.$refs.file.files[0])
        var _this = this
        let formData = new FormData()
        let obj = this.$refs.file.files[0]
        if (obj.size > (1024 * 1024 * 5)) {
          this.$vux.alert.show({
            title: '提示',
            content: '上传文件大小不超过5MB！'
          })
        } else {
          formData.append('myfile', this.$refs.file.files[0])
          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          _this.$http.post(_this.$root.urlPath.UPLOAD + '/upload/c', formData, config).then(function (res) {
            if (res.body.path) {
              _this.show1 = true
              this.form.attach = res.body.path
            }
          })
          _this.filename = this.$refs.file.files[0].name
        }
      },
      validateBeforeSubmit () {
        var _this = this
        if (this.maxerror || this.maxerror) {
          return
        }
        this.$validator.validateAll().then((result) => {
          if (result) {
            const params = this.form
            this.$vux.confirm.show({
              content: '是否提交报价单信息？',
              onCancel () {
              },
              onConfirm () {
                _this.$http.get(_this.$root.urlPath.MJK + '/wap/save/savePurchaseOffer', {params: params}).then(function (res) {
                  if (res.body.success) {
                    _this.$vux.alert.show({
                      title: '报价成功',
                      content: '资料已提交，报价结果会在报价日期截止前下发至您的手机，请保持手机通畅！',
                      onHide () {
                        window.location.href = this.$root.urlPath.MCM + "/purchase?newpage=newpage";
                      }
                    })
                  } else {
                    _this.$vux.alert.show({
                      title: '提示',
                      content: res.body.errMsg
                    })
                  }
                })
              }
            })
          }
        })
      },
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>
<style>
  @import '../../common/styles/comm';
  @import '../../common/styles/main';
  .buy .header{
  	background: #00a5f5;
  }
  .main_con{
    padding: 45px 0 0 0;
  }
  .cert .spec span{
    width: 40%
  }
  .cert .spec input{
    width: 50%
  }
  .submit:active, .submit:focus, .submit:hover{
    background: #6fb9f8;
  }
  .up-file{
    font-size: 0.15rem;
    align-items: center;
    margin-top: 0.1rem;
  }
  .up-file .file{
    position: relative;
    overflow: hidden;
    padding-left: 0.1rem;
  }
  .up-file .files{
    position: absolute;
    left: 0;
    top: 0;
    width: 28px;
    height: 28px;
    opacity: 0;
  }
  .up-file .label{
    padding-left: 0.23rem;
  }
  .up-file .file img{
    float: left;
  }
  .up-file .file .filename{
    width: 1.7rem;
    position: relative;
    left: 10px;
    line-height: 1.9;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>

