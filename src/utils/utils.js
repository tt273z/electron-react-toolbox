import { message } from 'antd'
export const loadScript = (url, cb) => {
	let script = document.createElement('script')
	let head = document.getElementsByTagName('head')[0]
	script.src = url
	script.onload = script.onreadystatechange = function() {
		if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
			cb && cb()
		}
	}
	script.onerror = function(ev){
		message.error('当前的URL地址无效 请重新输入')
	}
	head.appendChild(script)	
}