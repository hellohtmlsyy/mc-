import Vue from 'vue'
import { cookie, ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)


const MYLOGIN = 'http://member.miningcircle.com/login'
export function isDevice() {
		var ua = navigator.userAgent.toLowerCase()
		var u = navigator.userAgent
		var wxDevice = ua.match(/MicroMessenger/i) == 'micromessenger' //微信浏览器
		var appDevice = u.indexOf('/mcapp') >= 0 //app设备
		var adrDevice = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //安卓设备
		var iosDevice = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios设备
		if(wxDevice) {
			return '微信浏览器'
		} else if(appDevice) {
			if(adrDevice) {
				return 'adr'
			} else if(iosDevice) {
				return 'ios'
			}
		} else {
			return "其他浏览器"
		}
	}
//返回上一页
export function lastPage() {
	if(isDevice() == 'adr') {
		adwebkit.callApp("BACK", '');
	} else if(isDevice() == 'ios') {
		oswebkit.callApp("BACK", '');
	} else {
		window.history.go(-1)
	}
}

//调app登录方法
export function appLogin() {
	Vue.$vux.alert.show({
			title: '提示',
			content: '您当前尚未登录,点击确定去登陆！',
			onShow() {

			},
			onHide() {
				if(isDevice() == 'adr') {
					adwebkit.callApp("LOGIN", "登录的参数");
				} else if(isDevice() == 'ios') {
					oswebkit.callApp("LOGIN", "登录的参数");
				} else {
					window.location.href = MYLOGIN
				}
			}

		})
	}