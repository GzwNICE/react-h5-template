const getBaseUrl = () => {
  let env = process.env.ENV_CONFIG;
  let baseUrl = '';
  if (env === 'development') {
    baseUrl = 'gagago-app-api-test.51moneygo.com';
  } else if (env === 'test') {
    baseUrl = 'gagago-app-api-test.51moneygo.com';
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

export { isIPhoneX, debounce, getBaseUrl, format, numFormat };
