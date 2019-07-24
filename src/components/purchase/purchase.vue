<template>
	<div class="purch">
		<mheader></mheader>
		<m-header-o title="求购大厅" :icoBack="icoBack" class="header-purch" :class="scrollD ? 'headerSty1' : 'headerSty2'"  v-show="isApp">
      		<div slot="centerM">
      			<div class="searchBox" @click="toJump">
					<icon type="search" ></icon>
					<span>
					搜索
					</span>
				</div>
      		</div>
      		<div slot="rightM">
      			<span class="ico-manage" @click="switchPage"></span>
      		</div>
      	</m-header-o>
		<!-- <search
      v-model="searchValue"
      position="absolute"
      :autoFixed="false"
      ref="search"></search> -->
		<div class="clearfix banner-out" ref="bannerOut">
			<img class="banner" ref="banner" @click="toProa" src="../../common/img/banner.png" alt="">
		</div>
		<div class="filter">
			<div class="filter_out dis-fl">
				<div class="filter1">
					<group>
						<popup-radio placeholder="采购类型" :options="options1" v-model="option1"></popup-radio>
					</group>
				</div>
				<div class="filter2">
					<group>
              <!--<popup-picker :data="list3" :columns="3" v-model="addval" @on-shadow-change="locaChange" @on-hide="addChange" show-name placeholder="选择地址" ></popup-picker>-->
            </group>
<!--<a href="http://img.miningcircle.com/upload/ec/5a/ec5ae53b25034b979a34dd26dd9f4f33.jpg" download="http://img.miningcircle.com/upload/ec/5a/ec5ae53b25034b979a34dd26dd9f4f33.jpg">点击下载</a>-->
						<div @click="show=true" class="btn-addr">
							<span class="addr-text addr" v-show="showText">选择地址</span>
							<span class="addr-cur addr" v-show="!showText">{{curAddr.country}} {{curAddr.province}} {{curAddr.city}}</span>

						</div>
						<div></div>
						<popup v-model="show">
							<popup-header left-text="清空" right-text="确定" :show-bottom-border="false" @on-click-left="clearAddr" @on-click-right="sureAddress"></popup-header>
							<picker :data='list3' :columns=3 v-model='addvall' @on-change='locaChange' ref="picker1" show-name ></picker>
						</popup>
				</div>
				<!-- <span class="trumpet"></span>
        <marquee class="pur_news" :duration="1000" :item-height="22">
          <marquee-item v-for="i in 5" :key="i" @click.native="onClick(i)" class="align-middle">hello world {{i}}</marquee-item>
        </marquee> -->
				<!--<button class="purchase linear1" @click="toSell">求购</button>-->
				<button class="purchase linear2" @click="toMan">管理</button>
			</div>
		</div>
		<div class="list_out">
			<scroller lock-x height="-95" @on-scroll="Scroll" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="0">
				<div>
					<div class="item dis-fl" v-for="item in purchaseList" @click="toInfo(item.purchaseId)">
						<div class="flex-1 left">
							<div class="dis-fl name-out">
								<div class="name text-overflow">{{item.title}}</div>
								<div class="flex-1 text-center">
									<div class="adress">
										<span class="col-a3 text-line-1">{{item.address}}</span>
									</div>
								</div>
							</div>
							<div class="dis-fl">
								<span class="col-a3 pull-left totalQuantity">{{item.totalQuantity}}</span>
								<div class="member flex-1">已报价&nbsp;<strong>{{item.offerCount}}</strong></div>
							</div>
						</div>
						<div v-if="item.status === 6">
							<div>
								<button class="quote quoted">已完成</button>
							</div>
						</div>
						<div v-if="item.status === 3" class="right">
							<div>
								<button class="quote end">已截止</button>
							</div>
						</div>
						<div v-if="item.status === 5" class="right">
							<div class="time text-line-1">{{item.remainingTime}}截止</div>
							<div class="text-center">
								<button class="quote">报价</button>
							</div>
						</div>
						<div class="new" v-show="item.tag">
							<span class="text tran-center">新</span>
							<span class="triangle"></span>
						</div>
					</div>
					<divider v-show="showDivider">我是有底线的</divider>
					<div style="height:1.2rem" v-show="showSwiper"></div>
					<!-- <load-more tip="loading" v-show="showload"></load-more> -->
				</div>
			</scroller>
		</div>
		<div class="sell" @click="toSell">
			<span>发布<br>求购</span>
		</div>
		<!--<div class="fixed-swiper dis-fl text-center" v-show="showSwiper">
      <span class="close" @click="closeSwiper"></span>
      <swiper :list="img_list" style="width:100%;margin:0 auto;" :auto="loop" :show-dots="!loop" :loop="loop" :duration="1000" height="1.2rem" dots-class="custom-bottom" dots-position="center"></swiper>
    </div>-->
	</div>
</template>

<script>
	import Mheader from '@/components/base/m-header'
	import {appLogin} from '@/common/js/appFun.js'
	import { XButton, Group, PopupRadio, PopupPicker, Scroller, Divider, cookie, Swiper, SwiperItem, Popup, PopupHeader, Picker,Icon} from 'vux'
	import mHeaderO from '@/components/base/mHeaderO'
	import {isDevice} from '@/common/js/appFun.js'

	const baseList = [{
		url: 'http://trade.miningcircle.com/detail?id=897164339876728832',
		img: '../../../static/img/02.jpg'
	}, {
		url: 'http://trade.miningcircle.com/detail?id=895779918569279488',
		img: '../../../static/img/03.jpg'
	}, {
		url: 'http://trade.miningcircle.com/detail?id=895733888628822016',
		img: '../../../static/img/04.jpg',
		fallbackImg: '../../../static/img/02.jpg'
	}]
	const loginUrl = 'http://member.miningcircle.com/login'
	export default {
		components: {
			Mheader,
			XButton,
			Group,
			PopupRadio,
			PopupPicker,
			Scroller,
			Divider,
			Swiper,
			SwiperItem, Popup, PopupHeader, Picker,Icon,
			mHeaderO
		},
		data() {
			return {
				// nav: ['首页', '求购大厅', '新闻', '行情', '行情', '行情', '行情'],
				img_list: baseList,
				loop: true,
				list3: [],
				addval: [],
				searchValue: '',
				options1: [{
					key: '',
					value: '全部分类'
				}, {
					key: '1',
					value: '贵金属矿产'
				}, {
					key: '2',
					value: '有色金属'
				}, {
					key: '4',
					value: '黑色金属'
				}, {
					key: '8',
					value: '能源矿产'
				}, {
					key: '16',
					value: '稀有金属'
				}, {
					key: '32',
					value: '非金属'
				}, {
					key: '64',
					value: '矿用设备'
				}, {
					key: '128',
					value: '耗材药剂'
				}, {
					key: '256',
					value: '专业服务'
				}],
				purchaseList: '',
				option1: '',
				oldVal: '',
				pagenum: 1,
				showDivider: false,
				showload: false,
				showSwiper: true,
				show: false,
				curAddr:{
					country:'',
					province:'',
					city:''
				},
				showText:true,
				addvall:[],
				onFetching:false,
				scrollD:false,
				isApp:false,
				icoBack:true,
				mc_uid:cookie.get("MC_UID")
			}
		},
		created() {

			window.addEventListener('scroll', this.handleScroll);
			if(isDevice() == 'adr') {
				this.isApp = true
				if(!this.$route.query.newpage){
					this.icoBack = false
				}else{
					this.icoBack = true
				}

			}

			if(isDevice() == 'ios') {
				if(!this.$route.query.newpage) {
					this.icoBack = false
					this.isApp = false
				} else {
					this.isApp = true
					this.icoBack = true
				}
			}
			const timeNow = new Date().getTime()
			this.$http.get(this.$root.urlPath.MJK + '/wap/purchase/getUserInfo?t=' + timeNow+'&MC_UID='+this.mc_uid).then(function(res) {
				if(res.body.success) {
					this.username = res.body.data.userName
				}
			})
			this.$http.get(this.$root.urlPath.MJK + '/wap/purchase/getCompanyInfo?t=' + timeNow + '&MC_UID='+this.mc_uid).then(function(res) {
				console.log(res)
				if(res.body.success) {
					this.status = res.body.data.status
				} else {
					this.errMsg = res.body.errMsg
					this.errCode = res.body.errCode
				}
			})
			this.getCountry()
			this.purList()


		},
		watch: {
			option1(newVal) {
				this.pagenum = 1
				this.init()
				this.purList()
			}
		},
		mounted() {},
		methods: {
			init(){//重置滚动数据，加载全部，分页，节流
				this.pagenum = 1
				this.$nextTick(() => {
     				this.$refs.scrollerBottom.reset({top: 0})
    			})
				this.showDivider = false
				this.onFetching = false
			},
			sureAddress(){
				this.addval = this.addvall
				this.init()
				this.show = false
				this.showText = false
				this.getCurAddr()
				this.purList()
			},
			clearAddr(){
				this.init()
				this.show = false
				this.addval = []
				this.purList()
				this.showText = true
				this.getCountry()
			},
			getCurAddr(){
				for(let i in this.list3){
					if(this.list3[i].value == this.addval[0]){
						this.curAddr.country = this.list3[i].name
					}
					if(this.list3[i].value == this.addval[1]){
						this.curAddr.province = this.list3[i].name
					}
					if(this.list3[i].value == this.addval[2]){
						this.curAddr.city = this.list3[i].name
					}
				}
				console.log(this.addval)
			},
			getCountry(){
				this.$http.get(this.$root.urlPath.MJK + '/wap/purchase/getLocation').then(function(res) {
				if(res.body.success) {
					var addArr = []
					res.body.data.forEach((item, index) => {
						addArr[index] = {
							name: item.areaname,
							value: item.id,
							parent: 0
						}
					})
					this.list3 = addArr
				}
			})
			},
			Scroll(t, l) {


				if(t.top < 0) {
					return
				}
				this.bannerH = this.$refs.banner.clientHeight
				this.bannerH -= t.top / 2
				if(this.bannerH <= 0) {
					this.bannerH = 0
				}
				//    this.$refs.bannerOut.style.height = `${this.bannerH}px`
			},
			onScrollBottom() {

				if(this.onFetching) {
					// do nothing
				} else {
					this.showload = true
					this.onFetching = true
					this.pagenum++
					console.log(this.addval)
						const params = {
							country: this.addval[0],
							province: this.addval[1],
							city: this.addval[2],
							county: '',
							pageNum: this.pagenum,
							firstClass: this.option1
						}
					this.$http.get(this.$root.urlPath.MJK + '/wap/purchase/getPurchases', {
						params: params
					}).then(function(res) {
						if(res.body.success) {
							if(res.body.data.purchaseVOS.length === 0) {
								this.$refs.scrollerBottom.reset()
								this.showDivider = true
								return
							}
							this.purchaseList = this.purchaseList.concat(res.body.data.purchaseVOS)
							this.$nextTick(() => {
								this.$refs.scrollerBottom.reset()
							})
							this.onFetching = false
						}
						this.showload = false
					})
				}
			},
			getlocation(id) {
				this.$http.get(this.$root.urlPath.MJK + '/wap/purchase/getLocation?pId=' + id).then(function(res) {
					if(res.body.success) {
						var addArr = []
						if(!res.body.data) {
							return
						}
						res.body.data.forEach((item, index) => {
							addArr[index] = {
								name: item.areaname,
								value: item.id,
								parent: id
							}
						})
						this.list3 = this.list3.concat(addArr)
					}
				})
			},
			purList() {
				this.purchaseList = ''

				const params = {
					country: this.addval[0],
					province: this.addval[1],
					city: this.addval[2],
					county: '',
					pageNum: this.pagenum,
					firstClass: this.option1
				}

				this.$http.get(this.$root.urlPath.MJK + '/wap/purchase/getPurchases', {
					params: params
				}).then(function(res) {
					if(res.body.success) {
						this.purchaseList = res.body.data.purchaseVOS
						this.$refs.scrollerBottom.reset()
					}
				})
			},
			locaChange(val) {
				var id = ''
				if(val.length === 1) {
					id = val[0]
				}
				if(val.length === 2) {
					id = val[1]
				}
				if(val.length > 2) {
					var index = val.findIndex((item, index) => {
						return item == null
					})
					if(!index) {
						return
					}
					id = val[index - 1]
				}
				this.getlocation(id)
			},
			addChange(e) {
				if(e) {
					this.purList()
				}
			},
			toSell() {
				if(cookie.get('MC_UID')) {
					window.location.href = this.$root.urlPath.MCM + "/sell?newpage=newpage";
				} else {
					appLogin()
				}
			},
			toMan() {
				var _this = this
				if(this.errCode === '002001037') {
					this.$vux.alert.show({
						title: '提示',
						content: '您尚未登录',
						onHide() {
							window.location.href = loginUrl
						}
					})
				} else {
          // 如果是002001045或者002001048说明企业没有认证
					if(this.errCode === '002001045' || this.errCode === '002001048') {
						this.$vux.alert.show({
							title: '提示',
							content: this.errMsg,
							onHide() {
								window.location.href = _this.$root.urlPath.MCM + "/cert?newpage=newpage";
							}
						})
					} else {
            // 如果是2才是认证了
						if(this.status === 2) {
							window.location.href = 'http://member0.miningcircle.com/man_purchase?newpage=newpage'
						} else {
							this.$vux.alert.show({
								title: '提示',
								content: this.errMsg
							})
						}
					}
				}
			},
			toInfo(id) {
				if(cookie.get('MC_UID')) {
					window.location.href = this.$root.urlPath.MCM + "/detail?newpage=newpage&id=" + id;

				} else {
					appLogin()
				}
			},
			toProa() {
				window.location.href = this.$root.urlPath.MCM + "/proa?newpage=newpage";
			},
			closeSwiper() {
				this.showSwiper = false
			},
			handleScroll(){
				this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

				if(this.scrollTop > 4) {
					this.scrollD = true
				} else {
					this.scrollD = false
				}
			},
			toJump() {
				window.location.href = this.$root.urlPath.MCMAPP + "/search?newpage=newpage";
			},
			switchPage() {
				window.location.href = this.$root.urlPath.MCMAPP + "/switchPage?newpage=newpage";
			}
		}
	}
</script>
<style>
	@import '../../common/styles/comm';
	/*头部*/
  .purch .header-purch .leftM{
    flex:none;
    margin-right: 0.15rem;
  }
	.purch .headerSty1{
		background-color:#0094E8;
	}
	.purch .headerSty2{
		background-color:#0094e800;
	}
	.purch .header-purch{
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 999;
	}
	.purch .searchBox {
		margin: 0 0.1rem;
		background: #fff;
		border-radius: 1.25rem;
		color: #000;
		padding-left: 0.1rem;
		font-size: 0.15rem;
		line-height: 0.3rem;
		width: 1.8rem;
	}
	.purch .ico-manage{
		display: inline-block;
		background: url(../../common/img/ico-manage.png);
		width: 0.175rem;
		height: 0.175rem;
		background-size: 0.175rem;
		margin-right: 0.15rem;
	}
	.btn-addr{
		position: relative;
		color: #555;
		font-size: 14px;
	}
	.btn-addr .addr-cur{
		display: -webkit-box;
		/*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
		overflow: hidden;
		-webkit-line-clamp: 1;
	}
	.btn-addr .addr:after{
		content: " ";
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    border-width: 0px 2px 2px 0;
	}

	.banner-out {
		overflow: hidden;
	}

	.banner {
		float: left;
		width: 100%;
	}

	.filter_out .vux-popup-picker-placeholder {
		color: #555;
	}

	.filter_out {
		height: 45px;
		background: #fff;
		align-items: center;
		justify-content: space-around;
		padding: 0.05rem 0.05rem;
	}

	.filter1 {
		max-width: 1rem;
		color: #555;
		overflow: hidden;
		white-space: nowrap;
	}

	.filter1 .vux-cell-value {
		color: #555;
		font-size: 14px;
	}

	.filter2 {
		font-size: 0.12rem
	}

	.filter2 .vux-popup-picker-placeholder {
		color: #555;
		font-size: 14px
	}

	.filter2 .vux-cell-value {
		display: block;
		max-width: 0.7rem;
		color: #555;
		overflow: hidden;
		white-space: nowrap;
		font-size: 14px
	}

	.filter_out .weui-cells {
		width: 80px;
		border-radius: 15px;
		overflow: hidden;
		margin-top: 0;
		font-size: 0.14rem
	}

	.filter_out .weui-cell {
		padding: 0.06rem 0.05rem 0.06rem 0;
		text-align: center;
	}

	.filter_out .weui-cells:before,
	.filter_out .weui-cells:after {
		border: none
	}

	.purchase {
		width: 0.7rem;
		height: 0.3rem;
		line-height: 0.3rem;
		border: 1px solid #fff;
		color: #fff;
		font-size: 0.14rem;
		border-radius: 0.03rem;
	}

	.filter {
		border-top: 0.01rem solid #e8e8ed;
		height: 55px;
		background: #e8e8ed;
	}

	.item {
		align-items: center;
		padding: 0.15rem 0.1rem;
		background: #fff;
	}

	.item {
		position: relative;
		/* border-bottom: 0.02rem solid #f3f3f5; */
		margin-bottom: 0.05rem;
	}

	.item .new {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 0.15rem;
		height: 0.15rem;
		color: #22AD38;
		font-size: 12px
	}

	.item .text {
		color: #fff;
		z-index: 999;
	}

	.item .triangle {
		width: 0px;
		height: 0px;
		border-bottom: 0.25rem solid #22AD38;
		border-left: 0.25rem solid transparent;
		position: absolute;
		bottom: 0px;
		right: 0px;
		z-index: 100;
	}

	.item .name {
		width: 1.2rem;
		font-size: 0.16rem;
		margin-bottom: 0.03rem;
		overflow: hidden;
	}

	.item .right {
		width: 0.73rem;
	}

	.item .time {
		text-align: center;
		font-size: 0.14rem;
		color: #ec6941;
		margin-bottom: 0.03rem;
	}

	.item .member {
		color: #878787;
		text-align: center;
	}

	.quote {
		width: 0.68rem;
		height: 0.26rem;
		border: 1px solid #1593ff;
		color: #fff;
		font-size: 0.14rem;
		border-radius: 0.2rem;
		background:linear-gradient(90deg,rgba(0,148,232,1) 0%,rgba(77,191,255,1) 100%);
	}

	.quoted {
		border: 1px solid #22AD38;
		color: #fff;
	}

	.done {
		color: #fff;
		background: #1593ff
	}

	.end {
		border: 1px solid #bfbfbf;
		color: #fff;
		background: #bfbfbf
	}

	.box1 {
		font-size: 0.12rem;
		height: 0.35rem;
		position: relative;
		width: 1300px;
	}

	.box1-item {
		width: 1.5rem;
		height: 0.35rem;
		background-color: #ccc;
		display: inline-block;
		margin-left: 0.15rem;
		float: left;
		text-align: center;
		line-height: 0.35rem;
	}

	.box1-item:first-child {
		margin-left: 0;
	}

	.box2-wrap {
		height: 3rem;
		overflow: hidden;
	}

	.filter .weui-cell_access .weui-cell__ft:after {
		border-width: 0px 2px 2px 0;
	}

	.linear1 {
		background: -webkit-linear-gradient(bottom, #5bdb96, #079649);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(bottom, #5bdb96, #079649);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(bottom, #5bdb96, #079649);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to bottom, #5bdb96, #079649);
		/* 标准的语法 */
	}

	.linear2 {
		background: -webkit-linear-gradient(bottom, #74d1ff, #03a6f5);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(bottom, #74d1ff, #03a6f5);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(bottom, #74d1ff, #03a6f5);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to bottom, #74d1ff, #03a6f5);
		/* 标准的语法 */
	}

	.fixed-swiper {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%
	}

	.fixed-swiper .close {
		position: absolute;
		z-index: 99999;
		right: 0px;
		top: 0px;
		width: 30px;
		height: 30px;
		background: url('../../common/img/close.png') center center no-repeat
	}

	.list_out {
		padding: 0 0.05rem;
		background: #e8e8ed;
	}

	.totalQuantity {
		width: 1.2rem;
	}

	.name-out {
		align-items: center
	}

	.purch .sell{
		position: fixed;
		bottom: 1.25rem;
		right: 0.1rem;
		width:0.45rem;
		height:0.45rem;
		background:rgba(25,185,104,1);
		border-radius:50%;
		box-shadow:0px 0px 0.025rem rgba(53,152,102,0.6);
		color: #fff;
		font-size:0.11rem;
		text-align: center;
	}
	.purch .sell span{
		display: inline-block;
		margin-top: 0.075rem;
		line-height: 0.15rem;
	}
</style>
