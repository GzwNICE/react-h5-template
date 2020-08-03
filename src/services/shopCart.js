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
