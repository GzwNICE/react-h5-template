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
