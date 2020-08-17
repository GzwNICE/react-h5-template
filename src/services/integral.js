import { request } from '@/utils/request';

// 我的积分基本信息
export async function myPoints(params) {
  return request('/user/points/my', { method: 'get', params: params });
}

// 我的积分任务
export async function myTask(params) {
  return request('/user/points/my/task', { method: 'get', params: params });
}

// 我的积分任务
export async function changePoint(params) {
  return request('/user/points/exchange', { method: 'post', data: params });
}

// 我的积分明细
export async function flowIn(params) {
  return request('/user/points/flow/in', { method: 'get', params: params });
}
