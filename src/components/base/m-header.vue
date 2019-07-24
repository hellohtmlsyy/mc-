<template>
	<div>
		<div class="dis-fl head" v-show="notInapp">
			<div class="logo-out">
				<a href="http://m.miningcircle.com"><img class="logo" src="../../common/img/logo.png" alt=""></a>
			</div>
			<div class="nav">
				<a href="//m.miningcircle.com/home">首页</a>
				<span class="line">|</span>
				<a v-show="!username" href="http://member.miningcircle.com/login?redirectTo=http://trade.miningcircle.com">登录</a>
				<a href="" class="username">{{username}}</a>
				<span class="line">|</span>
				<span v-show="username" @click="delCookie('MC_UID', '', '-1')" class="out">退出</span>
				<span v-show="username" class="line">|</span>
				<a href="http://member.miningcircle.com/reg">注册</a>
			</div>
		</div>

		<!--<div class="OHeader" v-show="mcHeader">
			<div class="titleBox" @click="back">
				<span class="backIco" v-show="iosHeaderBack"></span>
				<span>求购大厅</span>
			</div>
			<div class="searchBox" @click="toJump">
				<icon type="search"></icon>
				<span>
				搜索
			</span>
			</div>
			<div class="rightBox">
				<span class="liebiaoIco" @click="switchPage"></span>
			</div>
		</div>-->
	</div>
</template>
<script>
	import { Icon,cookie} from 'vux'
	import {lastPage} from '@/common/js/appFun.js'
	
	export default {
		components: {
			Icon
		},
		data() {
			return {
				ua: navigator.userAgent,
				username: '',
				notInapp: true,
				iosHeaderBack: "",
				mcHeader: '', //appheader
				logoUrl: '',
				mc_uid:cookie.get("MC_UID")
			}
		},
		created() {
			let userAgent = navigator.userAgent.toLowerCase() // 获取userAgent
			let isInapp = userAgent.indexOf('/mcapp') >= 0 // 判断是否从app打开
			if(isInapp) {
				//		若是app,之前的头部隐藏,如果是adr显示头部,不显示返回箭头;如果是ios,若有newpage显示头部和箭头,若没有newpage隐藏头部和箭头
				this.notInapp = false
				var adrDevice = this.ua.indexOf('Android') > -1 || this.ua.indexOf('Adr') > -1 //安卓设备
				var iosDevice = !!this.ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios设备
				if(adrDevice) {
					this.mcHeader = true
					this.iosHeaderBack = false
				}

				if(iosDevice) {
					if(!this.$route.query.newpage) {
						this.iosHeaderBack = false
						this.mcHeader = false
					} else {
						this.mcHeader = true
						this.iosHeaderBack = true
					}
				}
			}
			const timeNow = new Date().getTime()
			
			this.$http.get(this.$root.urlPath.MJK + '/wap/purchase/getUserInfo?t=' + timeNow+'&MC_UID='+this.mc_uid).then(function(res) {
				if(res.body.success) {
					this.username = res.body.data.userName
				}
			})
		},
		methods: {
			delCookie(cname, cvalue, exdays) {
				var d = new Date()
				d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
				var expires = 'expires=' + d.toUTCString()
				console.info(cname + '=' + cvalue + '; ' + expires)
				document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/;domain=.miningcircle.com'
				this.$router.go(0)
				this.$router.push({
					path: '/',
					query: {
						newpage:'newpage'
					}
				})
			},
			back() {
				lastPage()
			},
			toJump() {
				window.location.href = "http://m.miningcircle.com/search?newpage=newpage";
			},
			switchPage() {
				window.location.href = "http://m.miningcircle.com/switchPage?newpage=newpage";
			}
		}
	}
</script>
<style>
	.head {
		height: 30px;
		line-height: 30px;
		padding: 0.03rem 0.12rem;
		justify-content: space-between;
		align-items: center
	}
	
	.logo-out {
		overflow: hidden;
		width: 0.51rem;
	}
	
	.logo-out img {
		float: left;
		max-width: 100%;
	}
	
	.head .nav {
		line-height: 1.6
	}
	
	.head .line {
		padding: 0 0.06rem;
	}
	
	.head a,
	.head .out {
		color: #08c;
		font-size: 0.14rem;
	}
	
	.nav a,
	.nav span {
		float: left;
	}
	
	.username {
		display: inline-block;
		max-width: 0.6rem;
		overflow: hidden;
		white-space: nowrap;
	}
	
</style>