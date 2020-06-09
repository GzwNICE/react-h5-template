import { request } from '@/utils/request';

export async function getOrderList(params) {
  return request('/app/v1/order/wait/luck/list', { method: 'get', params: params });
}
