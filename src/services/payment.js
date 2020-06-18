import { request } from '@/utils/request';

export async function getPaymentList(params) {
  return request('/app/go/coin/flow/page', { method: 'get', params: params });
}
export async function getHistoryList(params) {
  return request('/app/recharge/order/list', { method: 'get', params: params });
}
