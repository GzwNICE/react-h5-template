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
      var callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  };
};

export { isIPhoneX, debounce, getBaseUrl };
