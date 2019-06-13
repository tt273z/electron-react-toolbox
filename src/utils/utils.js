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

export const loadScript = (url, id, cb) => {
  let script = document.createElement('script')
  let head = document.getElementsByTagName('head')[0]
  script.src = url
  script.id = id
  script.onload = script.onreadystatechange = function () {
    if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
      cb && cb()
    }
  }
  script.onerror = function (ev) {
    message.error('当前的URL地址无效 请重新输入')
  }
  head.appendChild(script)
}
export const removeElement = id => {
  let e = document.getElementById(id)
  let rm = e.parentNode.removeChild(e)
  rm = null
}
export const type = obj => {
  return obj == null ? String(obj) :
    types[Object.prototype.toString.call(obj)] || "object"
}
export const codeOutputHandler = obj => {
  let s = type(obj)
  if (s == 'string') {
    return `"${obj}"`
  } else if (s == 'null' || s == 'undefined' || s == 'boolean' || s == 'regexp' || s == 'function') {
    return String(obj)
  } else if (s == 'array' || s == 'object') {
    return JSON.stringify(obj)
  } else if (s == 'number') {
    return obj
  } else {
    return 'donot know what it is'
  }
}
/**
 * 可拖动div
 * @param {String} title 可触发拖动的容器id
 * @param {String} limit 限制拖动范围的容器id 非必填
 */
export const Mover = function (title, limit) {
  this.obj = document.querySelector(title);
  this.limit = document.querySelector(limit);
  this.startx = 0;
  this.starty;
  this.startLeft;
  this.startTop;
  this.drag = this.obj.parentNode;
  this.isDown = false;
  this.originIndex = this.drag.style.zIndex;
  var that = this;

  this.movedown = function (e) {
    e = e ? e : window.event;
    if (!window.captureEvents) {
      this.setCapture();
    }

    that.isDown = true;
    that.obj.style.cursor = 'move';
    that.drag.style.zIndex = 1000;

    that.startx = e.clientX;
    that.starty = e.clientY;
    that.startLeft = parseInt(that.drag.offsetLeft);
    that.startTop = parseInt(that.drag.offsetTop);
  }
  this.move = function (e) {
    e = e ? e : window.event;
    if (that.isDown) {
      let left = e.clientX - (that.startx - that.startLeft);
      let top = e.clientY - (that.starty - that.startTop);
      if (limit) {
        left < 0 && (left = 0)
        top < 0 && (top = 0)
        left < that.limit.offsetWidth - that.drag.offsetWidth && (left = that.limit.offsetWidth - that.drag.offsetWidth)
        top < that.limit.offsetHeight - that.drag.offsetHeight && (top = that.limit.offsetHeight - that.drag.offsetHeight)
      }
      that.drag.style.left = left + "px";
      that.drag.style.top = top + "px";
    }
  }
  this.moveup = function () {
    that.isDown = false;
    that.obj.style.cursor = 'default';
    that.drag.style.zIndex = that.originIndex;
    if (!window.captureEvents) {
      this.releaseCapture();
    }
  }
  this.obj.onmousedown = this.movedown;
  this.obj.onmousemove = this.move;
  this.obj.onmouseup = this.moveup;

  //非ie浏览器
  document.addEventListener("mousemove", this.move, true);
}
export const copy2Clipboard = (text) => {
  let input = document.createElement('input');
  document.body.appendChild(input);
  input.setAttribute('value', text);
  input.select();
  if (document.execCommand('copy')) {
    document.execCommand('copy');
    message.success('已复制到剪贴板! 😎 ')
  }
  document.body.removeChild(input);
  input = null;
}