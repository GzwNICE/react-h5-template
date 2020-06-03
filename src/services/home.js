import { request } from '@/utils/request';

// 首页中奖者
export async function homeCarousel() {
  return request('/app/v1/activity/carousel', { method: 'get' });
}
// 首页banner
export async function homeBanner() {
  return request('/app/home/banner/list', { method: 'get' });
}
// 首页分类列表
export async function homeClass() {
  return request('/app/home/sorts/list', { method: 'get' });
}
// 首页人气列表
export async function homeHotLit(params) {
  return request('/app/home/hot/page', { method: 'get', params: params });
}
