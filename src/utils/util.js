const getBaseUrl = () => {
  let env = process.env.ENV_CONFIG;
  let baseUrl = '';
  if (env === 'development') {
    baseUrl = 'ohou-pitaya.5151money.cn';
    // baseUrl = '192.168.1.29';
  } else if (env === 'test') {
    baseUrl = 'ohou-pitaya.5151money.cn';
  } else if (env === 'release') {
    baseUrl = 'gagago-app-api-vn.9191money.com';
  } else if (env === 'production') {
    baseUrl = 'app-api.winmybonus.com';
  }
  return baseUrl;
};

const isIPhoneX = () => {
  if (typeof window !== 'undefined' && window) {
    return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812;
  }
  return false;
};

const debounce = (func, wait, immediate) => {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    }
  };
};

const format = (data, type) => {
  function add(m) {
    return m < 10 ? '0' + m : m;
  }
  let time = new Date(Number(data));
  let y = time.getFullYear();
  let m = time.getMonth() + 1;
  let d = time.getDate();
  let h = time.getHours();
  let mm = time.getMinutes();
  let s = time.getSeconds();
  let sm = time.getMilliseconds();
  if (type === 'arr') {
    return [
      add(d) + '/' + add(m) + '/' + y,
      add(h) + ' ' + ':' + ' ' + add(mm) + ' ' + ':' + ' ' + add(s) + ' ' + add(sm),
    ];
  } else {
    return add(d) + '/' + add(m) + '/' + y + ' ' + add(h) + ':' + add(mm);
  }
};

const numFormat = value => {
  if (value || value === 0) {
    return String(value).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
  } else {
    return '';
  }
};
const random = m => {
  const min = 0;
  const max = m - 1;
  let rand = Math.floor(Math.random() * (max - min + 1)) + min;
  return rand;
};

const cycle = code => {
  let str = '';
  switch (code) {
    case 0:
      str = '永久';
      break;
    case 1:
      str = '每日';
      break;
    case 2:
      str = '每周';
      break;
    case 3:
      str = '每月';
      break;
    default:
      str = '';
  }
  return str;
};

const taskJump = type => {
  let str = '';
  switch (type) {
    case 'EDITED_INFO_DONE': //完善资料
      str = '/personal';
      break;
    case 'FIRST_RECHARGED': //首次充值
      str = '/payment';
      break;
    case 'SIGNED': // 签到
      str = '/home';
      break;
    case 'INVITED_FRIEND': // 邀请好友
      str = '/invitation';
      break;
    case 'JOINED_IN_ACTIVITY': //参与活动
      str = '/home';
      break;
    case 'SHARED_COMMODITY': // 分享商品
      str = '/home';
      break;
    case 'SHARED_ORDER': // 发布晒单
      str = '/evaluation';
      break;
    case 'PRAISED_SHARED_ORDER': // 晒单点赞
      str = '/evaluation';
      break;
    case 'BETTER_SHARED_ORDER': // 晒单加精
      str = '/evaluation';
      break;
    case 'UP_SHARED_ORDER': // 晒单置顶
      str = '/evaluation';
      break;
    default:
      str = '';
  }
  return str;
};

export { isIPhoneX, debounce, getBaseUrl, format, numFormat, random, cycle, taskJump };
