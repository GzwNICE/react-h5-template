import { request } from '@/utils/request';

export async function getPrizeInfo(params) {
  return request('/app/prizes/receive', { method: 'post', data: params });
}

export async function submitPrize(params) {
  return request('/app/prizes/rules/confirm', { method: 'post', data: params });
}

export async function resultInfo(params) {
  return request('/app/prizes/result/info', { method: 'post', data: params });
}

export async function sltInfo(params) {
  return request('/app/v1/recycle/rules/info', { method: 'get', params: params });
}

export async function goChange(params) {
  return request('/app/v1/exchange/info/confirm', { method: 'post', data: params });
}

export async function cashChange(params) {
  return request('/app/v1/exchange/info/cash', { method: 'post', data: params });
}
