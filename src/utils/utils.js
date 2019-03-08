import { message } from 'antd'

const types = {
   "[object Array]": "array",
   "[object Boolean]": "boolean",
   "[object Date]": "date",
   "[object Function]": "function",
   "[object Number]": "number",
   "[object Object]": "object",
   "[object RegExp]": "regexp",
   "[object String]": "string",
}

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
export const type = obj => {
	return obj == null ? String(obj) :
    types[Object.prototype.toString.call(obj)] || "object"
}
export const codeOutputHandler = obj => {
	let s = type(obj)
	if(s=='string') {
		return `"${obj}"`
	} else if(s=='null'||s=='undefined'||s=='boolean'||s=='regexp'||s=='function'){
		return String(obj)
	} else if(s=='array'||s=='object') {
		return JSON.stringify(obj)
	} else {
		return 'donot know what it is'
	}
}