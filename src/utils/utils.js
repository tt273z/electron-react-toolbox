export const loadScript = (url, cb) => {
	let script = document.createElement('script')
	let head = document.getElementsByTagName('head')[0]
	script.src = url
	script.onload = script.onreadystatechange = () => {
		if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
			cb && cb()
		}
	}
	head.appendChild(script)	
}