import { request } from '@/utils/request';

// 添加购物车
export async function addCart(params) {
  return request('/app/shop/car/add', { method: 'post', data: params });
}

// 购物车list
export async function cartList(params) {
  return request('/app/shop/car/list', { method: 'get', params: params });
}

// 删除购物车
export async function delShop(params) {
  return request('/app/shop/car/delete', { method: 'post', data: params });
}

// 购物车下单
export async function carPay(params) {
  return request('/app/shop/car/pay', { method: 'post', data: params });
}

// 修改购物车数量
export async function buyCount(params) {
  return request('/app/shop/car/buy/count', { method: 'post', data: params });
}
