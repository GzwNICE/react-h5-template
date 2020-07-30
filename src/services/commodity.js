import { request } from '@/utils/request';
// 一级分类
export async function category() {
  return request('/app/v1/category/list', { method: 'get' });
}
// 当前分类全部商品
export async function productList(params) {
  return request('/app/v1/category/product/list', { method: 'get', params: params });
}
// 当前分类下的二级分类
export async function childList(params) {
  return request('/app/v1/category/child/list', { method: 'get', params: params });
}
