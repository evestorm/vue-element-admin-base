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
export function getScrollPosition(el = windows) {
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
export function throttleV(fn, gapTime = 500) {
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
 * ! ---------------------- 设备相关 ----------------------
 */

/**
 * @description 检查当前设备是移动端还是桌面端
 * @example detectDeviceType(); // "Mobile" or "Desktop"
 */
export function detectDeviceType() {
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
}
