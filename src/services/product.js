import { request } from '@/utils/request';

export async function fetchRules(params) {
  return request('/app/activity/turns/last-order', { method: 'get', params: params });
}

export async function fetchInfo(params) {
  return request('/app/activity/turn/info', { method: 'get', params: params });
}
