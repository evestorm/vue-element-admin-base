import moment from "moment";

// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from "@/utils";

/**
 * 如果时间是复数的数字显示复数标签
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return time + label + "s";
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), " minute");
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), " hour");
  } else {
    return pluralize(~~(between / 86400), " day");
  }
}

/**
 * @description 数字格式
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1e18, symbol: "E" },
    { value: 1e15, symbol: "P" },
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "G" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "k" },
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[i].symbol;
    }
  }
  return num.toString();
}

/**
 * @description 格式化为千位符
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
}

/**
 * @description 大写第一个字符
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * @description 格式化货币
 * @param {string} s 金钱
 * @returns 返回格式化后的货币
 */
export const formatMoney = s => {
  if (/[^0-9]\./.test(s)) return "invalid value";
  if (s == null) return "invalid value";
  s = s.toString();
  s = s.replace(/^(\d*)$/, "$1.");
  s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
  s = s.replace(".", ",");
  var re = /(\d)(\d{3},)/;
  while (re.test(s)) {
    s = s.replace(re, "$1,$2");
  }
  s = s.replace(/,(\d\d)$/, ".$1");
  return s.replace(/^\./, "0.").toString();
};

/**
 * @description 转成大写
 * @param {string} value 字符串
 * @returns 返回大写字母的字符串
 */
export const uppercase = value => {
  if (!value) return "";
  // 返回处理后的值
  return value.toUpperCase();
};

/**
 * @description 转成小写
 * @param {string} value 字符串
 * @returns 返回小写字母的字符串
 */
export const lowercase = value => {
  if (!value) return "";
  // 返回处理后的值
  return value.toLowerCase();
};

/**
 * @description 格式化日期为年月日
 * @param {string} value 字符串
 * @returns 返回 YY年MM月DD日
 */
export const parseTextDate = value => {
  if (!value) return "";
  return moment(value).format("YYYY年MM月DD日");
};

/**
 * @description 格式化日期
 * @param {string} value 字符串
 * @returns 返回 YYYY-MM-DD
 */
export const parseShortDate = value => {
  if (!value) return "";
  return moment(value).format("YYYY-MM-DD");
};

/**
 * @description 格式化月份
 * @param {string} value 字符串
 * @returns 返回 YYYY—MM
 */
export const date2month = value => {
  if (!value) return "";
  return moment(value).format("YYYY-MM");
};

/**
 * @description 格式化日期 + 时间
 * @param {string} value 字符串
 * @returns 返回 YY-MM-DD HH:mm
 */
export const parseDatetime = value => {
  if (!value) return "";
  return moment(value).format("YYYY-MM-DD HH:mm");
};

/**
 * @description 将数值四舍五入(保留2位小数)后格式化成金额形式
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
export const formatCurrency = num => {
  // eslint-disable-next-line no-useless-escape
  num = num.toString().replace(/\$|\,/g, "");
  if (isNaN(num)) num = "0";
  const sign = num == (num = Math.abs(num));
  num = Math.floor(num * 100 + 0.50000000001);
  let cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10) cents = "0" + cents;
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) num = num.substring(0, num.length - (4 * i + 3)) + "," + num.substring(num.length - (4 * i + 3));
  return (sign ? "" : "-") + num + "." + cents;
};

/**
 * @description 手机号码中间四位打※
 * @param {String} phone 电话号码
 */
export const formatPhone = phone => {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
};
