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
// 首页最新列表
export async function homeLatestLit(params) {
  return request('/app/home/latest', { method: 'get', params: params });
}
// 首页将止列表
export async function homeEndLit(params) {
  return request('/app/home/upcoming/open', { method: 'get', params: params });
}
// 首页价值列表
export async function homeSortLit(params) {
  return request('/app/home/sort/value', { method: 'get', params: params });
}
// 首页配置
export async function homeConf() {
  return request('/app/system/conf/index', { method: 'get' });
}
// 首页推广位
export async function promote() {
  return request('/app/home/promote/list', { method: 'get' });
}
// 首页弹窗
export async function homePop() {
  return request('/app/home/home/pop', { method: 'get' });
}
