import axios from "axios";
import storage from "@/utils/storage/index";
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * ! ---------------------- 时间相关 ----------------------
 */

/**
 * 时间戳转字符串
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 * @example parseTime("{y}-{m}-{d} {h}:{i}") : 1113846303921 => 2005-04-19 01:45
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), "/");
      }
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
}

/**
 * @description xx分钟前
 * @param {number} time
 * @param {string} option
 * @returns {string}
 * @example formatTime(+new Date() - 1) => '刚刚'
 */
export function formatTime(time, option) {
  if (("" + time).length === 10) {
    time = parseInt(time) * 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return "刚刚";
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + "分钟前";
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前";
  } else if (diff < 3600 * 24 * 2) {
    return "1天前";
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return d.getMonth() + 1 + "月" + d.getDate() + "日" + d.getHours() + "时" + d.getMinutes() + "分";
  }
}

/**
 * @description 获取当前时间
 * @param format
 * @returns {string}
 */
export function getCurDate(format = "YYYY-MM-DD HH:mm:ss") {
  return this.$moment().format(format);
}

/**
 * ! ---------------------- 字符串相关 ----------------------
 */

/**
 * @description 字节长度
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length;
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s += 2;
    if (code >= 0xdc00 && code <= 0xdfff) i--;
  }
  return s;
}

/**
 * @description 创建唯一字符串
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + "";
  const randomNum = parseInt((1 + Math.random()) * 65536) + "";
  return (+(randomNum + timestamp)).toString(32);
}

/**
 * @param {string} str 截取字符串并加省略号
 * @param {Number} length 截取长度
 * @returns str 被截取后的字符串
 */
export function subText(str, length = 10) {
  if (str.length === 0) return "";
  return str.length > length ? str.substr(0, length) + "..." : str;
}

/**
 * @description 金钱格式化，三位加逗号
 * @param { number } num
 */
export const formatMoney = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/**
 * ! ---------------------- 数组相关 ----------------------
 */

/**
 * @description 清空数组
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

/**
 * @description 数组去重
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr));
}

/**
 * @description 返回数组中的最大值
 * @param {Array} arr 数组
 * @returns 最大值
 */
export function arrayMax(arr) {
  return Math.max(...arr);
}

/**
 * @description 返回数组中的最小值
 * @param {Array} arr 数组
 * @returns 最小值
 */
export function arrayMin(arr) {
  return Math.min(...arr);
}

/**
 * ! ---------------------- url&参数相关 ----------------------
 */

/**
 * @description 从 url 中获取参数并组装成对象返回
 * @param {string} url
 * @returns {Object}
 * @example http://www.xxx.com?name=lance&age=18 => {name: 'lance', age: '18'}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf("?") + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

/**
 * @description json转url参数
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return "";
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return "";
      return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
    }),
  ).join("&");
}

/**
 * @description 从 url 中获取参数并组装成对象返回
 * @param {string} url
 * @returns {Object}
 * @example http://www.xxx.com?name=lance&age=18 => {name: 'lance', age: '18'}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split("?")[1]).replace(/\+/g, " ");
  if (!search) {
    return {};
  }
  const obj = {};
  const searchArr = search.split("&");
  searchArr.forEach(v => {
    const index = v.indexOf("=");
    if (index !== -1) {
      const name = v.substring(0, index);
      const val = v.substring(index + 1, v.length);
      obj[name] = val;
    }
  });
  return obj;
}

/**
 * @description 返回一个包含当前 URL 所有参数的对象
 * @param {String} url URL
 * @example getURLParameters('http://url.com/page?n=Adam&s=Smith'); // {n: 'Adam', s: 'Smith'}
 * @example getURLParameters('google.com'); // {}
 */
export function getURLParameters(url) {
  return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce((a, v) => ((a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a), {});
}

/**
 * @description html转文字
 * @param {string} val
 * @returns {string}
 * @example <div>2333</div> => 2333
 */
export function html2Text(val) {
  const div = document.createElement("div");
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

/**
 * @description 获得当前 URL
 * @example currentURL(); // 'https://google.com'
 */
export function currentURL() {
  return window.location.href;
}

/**
 * ! ---------------------- 对象相关 ----------------------
 */

/**
 * @description  合并两个对象,第二个参数对象的优先级更高
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 * @example objectMerge({name: 'lance', age: 18}, {name: 'jerry', sex: 1}) => {name: "jerry", age: 18, sex: 1}
 */
export function objectMerge(target, source) {
  if (typeof target !== "object") {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property];
    if (typeof sourceProperty === "object") {
      target[property] = objectMerge(target[property], sourceProperty);
    } else {
      target[property] = sourceProperty;
    }
  });
  return target;
}

/**
 * 这只是一个简单的版本的深拷贝
 * 有很多边界情况的bug
 * 如果你想用一个完美的深拷贝,使用 lodash 的 _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== "object") {
    throw new Error("error arguments", "deepClone");
  }

  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

/**
 * ! ---------------------- DOM 相关 ----------------------
 */

/**
 * @description 获取窗口可视范围的高度
 */
export function getClientHeight() {
  let clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = document.body.clientHeight < document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight;
  } else {
    clientHeight = document.body.clientHeight > document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight;
  }
  return clientHeight;
}

/**
 * @description 获取窗口可视范围宽度
 */
export function getPageViewWidth() {
  let d = document,
    a = d.compatMode == "BackCompat" ? d.body : d.documentElement;
  return a.clientWidth;
}

/**
 * @description 获取窗口宽度
 */
export function getPageWidth() {
  let g = document,
    a = g.body,
    f = g.documentElement,
    d = g.compatMode == "BackCompat" ? a : g.documentElement;
  return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
}

/**
 * @description 获取窗口尺寸
 */
export function getViewportOffset() {
  if (window.innerWidth) {
    return {
      w: window.innerWidth,
      h: window.innerHeight,
    };
  } else {
    // ie8及其以下
    if (document.compatMode === "BackCompat") {
      // 怪异模式
      return {
        w: document.body.clientWidth,
        h: document.body.clientHeight,
      };
    } else {
      // 标准模式
      return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight,
      };
    }
  }
}

/**
 * @description 获取滚动条距顶部高度
 */
export function getPageScrollTop() {
  let a = document;
  return a.documentElement.scrollTop || a.body.scrollTop;
}

/**
 * @description 获取滚动条距左边的高度
 */
export function getPageScrollLeft() {
  let a = document;
  return a.documentElement.scrollLeft || a.body.scrollLeft;
}

/**
 * @description 开启全屏
 * @param {*} element
 */

export function launchFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  }
}

/**
 * @description 关闭全屏
 */
export function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * @description 检查页面底部是否可见
 */
export const bottomVisible = () => {
  return document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight);
};

/**
 * @description 滚动到指定元素区域
 * @param element 哪个元素
 */
export const smoothScroll = element => {
  document.querySelector(element).scrollIntoView({
    behavior: "smooth",
  });
};

/**
 * @description 切换类
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += "" + className;
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}

/**
 * @description 检测一个元素是否包含一个类
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

/**
 * @description 为元素添加一个类
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
}

/**
 * @description 从元素总删除一个类
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
  }
}

/**
 * @description 隐藏元素们
 * @param  {...any} el 元素们
 * @example hide(document.querySelectorAll('img')); // Hides all <img> elements on the page
 */
export function hideElement(...el) {
  [...el].forEach(e => (e.style.display = "none"));
}

/**
 * @description 获取当前页面的滚动位置
 * @param {Element} el 元素
 * @example getScrollPosition(); // {x: 0, y: 200}
 */
export function getScrollPosition(el = window) {
  return {
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
  };
}

/**
 * @description 平滑滚动到页面顶部
 * @example scrollToTop();
 */
export function scrollToTop() {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
}

/**
 * @description 检查当前元素是否包含某个子元素
 * @param {Element} parent 父元素
 * @param {Element} child 子元素
 * @example elementContains(document.querySelector('head'), document.querySelector('title'))
 * @example elementContains(document.querySelector('body'), document.querySelector('body'))
 */
export function elementContains(parent, child) {
  return parent !== child && parent.contains(child);
}

/**
 * @description 检查指定元素是否出现在视口范围内
 * @param {Element} el 元素
 * @param {Boolean} y 是否部分可见
 * @example elementIsVisibleInViewport(el); // (not fully visible)
 * @example elementIsVisibleInViewport(el, true); // (partially visible)
 */
export function elementIsVisibleInViewport(el, partiallyVisible = false) {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) && ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
}

/**
 * @description 获取一个元素内的所有图片
 * @param {Element} el 元素
 * @param {Boolean} includeDuplicates 是否包括重复
 * @example getImages(document, true); // ['image1.jpg', 'image2.png', 'image1.png', '...']
 * @example getImages(document, false); // ['image1.jpg', 'image2.png', '...']
 */
export function getImages(el, includeDuplicates = false) {
  const images = [...el.getElementsByTagName("img")].map(img => img.getAttribute("src"));
  return includeDuplicates ? images : [...new Set(images)];
}

/**
 * @description 将表单元素编码为对象
 * @param {Element} form form表单元素
 * @example formToObject(document.querySelector('#form')); // { email: 'test@email.com', name: 'Test Name' }
 */
export function formToObject(form) {
  return Array.from(new FormData(form)).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value,
    }),
    {},
  );
}

/**
 * @description 在给定元素上触发特定事件且能选择地传递自定义数据
 * @param {Element} el 给定元素
 * @param {EventType} eventType 事件类型
 * @param {Object} detail 自定义数据
 * @example triggerEvent(document.getElementById('myId'), 'click');
 * @example triggerEvent(document.getElementById('myId'), 'click', { username: 'bob' });
 */
export function triggerEvent(el, eventType, detail) {
  el.dispatchEvent(new CustomEvent(eventType, { detail }));
}

/**
 * @description 移除元素的事件监听器
 * @param {Element} el 指定元素
 * @param {EventTarget} evt 目标事件
 * @param {Function} fn 函数
 * @param {Object} opts 可选参数
 * @example
 *  const fn = () => console.log('!');
 *  document.body.addEventListener('click', fn);
 *  off(document.body, 'click', fn); // no longer logs '!' upon clicking on the page
 */
export const off = (el, evt, fn, opts = false) => el.removeEventListener(evt, fn, opts);

/**
 * @description 复制一串字符到剪贴板
 * @param {String} str 字符串
 * @example copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.
 */
export const copyToClipboard = str => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

/**
 * @description 自适应页面（rem）
 * @param { number } width
 */
export function AutoResponse(width = 750) {
  const target = document.documentElement;
  target.clientWidth >= 600 ? (target.style.fontSize = "80px") : (target.style.fontSize = (target.clientWidth / width) * 100 + "px");
}

/**
 * ! ---------------------- 文件相关 ----------------------
 */

/**
 * @description 获取文件base64编码
 * @param file
 * @param format  指定文件格式
 * @param size  指定文件大小(字节)
 * @param formatMsg 格式错误提示
 * @param sizeMsg   大小超出限制提示
 * @returns {Promise<any>}
 */
export function fileToBase64String(file, format = ["jpg", "jpeg", "png", "gif"], size = 20 * 1024 * 1024, formatMsg = "文件格式不正确", sizeMsg = "文件大小超出限制") {
  return new Promise((resolve, reject) => {
    // 格式过滤
    let suffix = file.type.split("/")[1].toLowerCase();
    let inFormat = false;
    for (let i = 0; i < format.length; i++) {
      if (suffix === format[i]) {
        inFormat = true;
        break;
      }
    }
    if (!inFormat) {
      reject(formatMsg);
    }
    // 大小过滤
    if (file.size > size) {
      reject(sizeMsg);
    }
    // 转base64字符串
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      let res = fileReader.result;
      resolve({ base64String: res, suffix: suffix });
      reject("异常文件，请重新选择");
    };
  });
}

/**
 * @description 转换到KB,MB,GB并保留两位小数
 * @param { number } fileSize
 */
export function formatFileSize(fileSize) {
  let temp;
  if (fileSize < 1024) {
    return fileSize + "B";
  } else if (fileSize < 1024 * 1024) {
    temp = fileSize / 1024;
    temp = temp.toFixed(2);
    return temp + "KB";
  } else if (fileSize < 1024 * 1024 * 1024) {
    temp = fileSize / (1024 * 1024);
    temp = temp.toFixed(2);
    return temp + "MB";
  } else {
    temp = fileSize / (1024 * 1024 * 1024);
    temp = temp.toFixed(2);
    return temp + "GB";
  }
}

/**
 * @description base64转file
 * @param { base64 } base64
 * @param { string } filename 转换后的文件名
 */
export const base64ToFile = (base64, filename) => {
  let arr = base64.split(",");
  let mime = arr[0].match(/:(.*?);/)[1];
  let suffix = mime.split("/")[1]; // 图片后缀
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${filename}.${suffix}`, { type: mime });
};

/**
 * @description base64转blob
 * @param { base64 } base64
 */
export const base64ToBlob = base64 => {
  let arr = base64.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

/**
 * @description blob转file
 * @param { blob } blob
 * @param { string } fileName
 */
export const blobToFile = (blob, fileName) => {
  blob.lastModifiedDate = new Date();
  blob.name = fileName;
  return blob;
};

/**
 * @description 导出excel并下载
 * @param {Blob} data 数据流
 * @example
 * let data = {
      method: "post",
      url: "url",
      fileName: "司机注册信息.xlsx",
      params: {
        pageNum: 1,
        pageSize: this.total,
        realName: "",
        certifiedLevel: null,
        regTimeStart: "",
        regTimeEnd: "",
      },
    };
    exportExcel(data);
 */
export const exportExcel = data => {
  axios({
    method: data.method,
    url: data.url,
    data: data.params,
    responseType: "blob",
    headers: {
      token: storage.getToken(),
    },
  })
    .then(res => {
      const link = document.createElement("a");
      let blob = new Blob([res.data], { type: "application/x-excel" });
      link.style.display = "none";
      link.href = URL.createObjectURL(blob);
      link.download = data.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(() => {});
};

/**
 * @description file转base64
 * @param { * } file 图片文件
 */
export const fileToBase64 = file => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (e) {
    return e.target.result;
  };
};

/**
 * ! ---------------------- 防抖节流相关 ----------------------
 */

/**
 * @description 函数被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

/**
 * @description: 防抖函数：函数被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时
 * @param {Function} fn 要执行的函数
 * @param {Number} delay  delay毫秒后执行回调
 */
export function debounceV(fn, delay = 500) {
  let timer = null;
  return function () {
    const context = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(context, arguments);
      timer = null;
    }, delay);
  };
}

/**
 * @description: 节流函数：规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行
 * @param {Function} fn 要执行的函数
 * @param {Number} gapTime  单位时间
 */
export function throttle(fn, gapTime = 500) {
  let canUse = true;
  return function () {
    if (canUse) {
      fn.apply(this, arguments);
      canUse = false;
      setTimeout(() => (canUse = true), gapTime);
    }
  };
}

/**
 *
 * @description 延迟指定的时间去执行函数
 * @param {Function} fn 执行函数
 * @param {Number} wait 延迟时间
 * @param  {...any} args 剩余参数
 * @example delay(
 function(text) {
                    console.log(text);
                },
 1000,
 'later'
 );
 */
export const delay = (fn, wait, ...args) => setTimeout(fn, wait, ...args);

/**
 * @description 获取随机数
 * @param min: Number, 最小值
 * @param max: Number, 最大值
 * range: String, 圈定范围，默认左闭右闭,可传 '[]', '[)', '(]', '()'
 */
export function getRandomNumberFrom(min, max, range = "[]") {
  let num = 0;
  switch (range) {
    case "[)":
      num = Math.floor(Math.random() * (max - min) + min);
      break;
    case "(]":
      num = Math.ceil(Math.random() * (max - min) + min);
      break;
    case "()":
      num = Math.round(Math.random() * (max - min - 2) + min + 1);
      break;
    default:
      num = Math.round(Math.random() * (max - min) + min);
  }
  return num;
}

/**
 * ! ---------------------- 验证相关 ----------------------
 */

/**
 * @description 匹配电子邮件地址
 * @param {string} val 电子邮箱
 */
export function isEmailAddress(value) {
  return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value) || /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(value);
}

/**
 * @description 验证邮政编码(中国)
 * @param {string} val 邮编
 */
export function isPostcode(value) {
  return /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/g.test(value);
}

/**
 * @description 验证网址(支持端口和"?+参数"和"#+参数)
 * @param {string} value 网址
 */
export function isRightWebsite(value) {
  return /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/g.test(value);
}

/**
 * @description 验证银行卡号（10到30位, 覆盖对公/私账户, 参考微信支付）
 * @param {string} value 银行卡号
 */
export function isAccountNumber(value) {
  return /^[1-9]\d{9,29}$/g.test(value);
}

/**
 * @description 验证中文姓名
 * @param {string} value 中文名
 */
export const isChineseName = value => /^(?:[\u4e00-\u9fa5·]{2,16})$/g.test(value);

/**
 * @description 验证英文名
 * @param {string} value 英文名
 */
export const isEnglishName = value => /(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/g.test(value);

/**
 * @description 验证车牌号(新能源)
 * @param {string} value 新能源车牌号
 */
export const isLicensePlateNumberNER = value =>
  /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/g.test(value);

/**
 * @description 验证车牌号(非新能源)
 * @param {string} value 车牌号
 */
export const isLicensePlateNumberNNER = value =>
  /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/g.test(value);

/**
 * @description 验证车牌号(新能源+非新能源)
 * @param {string} value 车牌号
 */
export const isLicensePlateNumber = value =>
  /^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/g.test(
    value,
  );

/**
 * @description 验证手机号中国(严谨), 根据工信部2019年最新公布的手机号段
 * @param {string} value 手机号
 */
export const isMPStrict = value => /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g.test(value);

/**
 * @description 验证手机号中国(宽松), 只要是13,14,15,16,17,18,19开头即可
 * @param {string} value 手机号
 */
export const isMPRelaxed = value => /^(?:(?:\+|00)86)?1[3-9]\d{9}$/g.test(value);

/**
 * @description 验证邮箱
 * @param { string } value
 */
export const isEmail = value => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g.test(value);

/**
 * @description 验证座机电话(国内),如: 0341-86091234
 * @param { string } value
 */
export const isLandlineTelephone = value => /\d{3}-\d{8}|\d{4}-\d{7}/g.test(value);

/**
 * @description 验证身份证号(1代,15位数字)
 * @param { string } value
 */
export const isIDCardOld = value => /^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$/g.test(value);

/**
 * @description 验证身份证号(2代,18位数字),最后一位是校验位,可能为数字或字符X
 * @param { string } value
 */
export const isIDCardNew = value => /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}[\dXx]$/g.test(value);

/**
 * @description 验证身份证号, 支持1/2代(15位/18位数字)
 * @param { string } value
 */
export const isIDCard = value => /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/g.test(value);

/**
 * @description 验证护照（包含香港、澳门）
 * @param { string } value
 */
export const isPassport = value => /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/g.test(value);

/**
 * @description 验证小数
 * @param { string } value
 */
export const isDecimal = value => /^\d+\.\d+$/g.test(value);

/**
 * @description 验证数字
 * @param { string } value
 */
export const isNumber = value => /^\d{1,}$/g.test(value);

/**
 * @description 验证数字和字母组成
 * @param { string } value
 */
export const isNumAndStr = value => /^[A-Za-z0-9]+$/g.test(value);

/**
 * @description 判断是否为数字且最多两位小数
 * @param str
 * @returns {boolean}
 */
export function isNum(str) {
  const reg = /^\d+(\.\d{1,2})?$/;
  return reg.test(str);
}

/**
 * ! ---------------------- 设备相关 ----------------------
 */

/**
 * @description 检查当前设备是移动端还是桌面端
 * @example detectDeviceType(); // "Mobile" or "Desktop"
 */
export function detectDeviceType() {
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
}

/**
 * @description 判断IE浏览器版本和检测是否为非IE浏览器
 */
export function IEVersion() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
  var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
  var isIE11 = userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) {
      return 7;
    } else if (fIEVersion == 8) {
      return 8;
    } else if (fIEVersion == 9) {
      return 9;
    } else if (fIEVersion == 10) {
      return 10;
    } else {
      return 6; //IE版本<=7
    }
  } else if (isEdge) {
    return "edge"; //edge
  } else if (isIE11) {
    return 11; //IE11
  } else {
    return -1; //不是ie浏览器
  }
}
