import { request } from '@/utils/request';

export async function getPrizeInfo(params) {
  return request('/app/prizes/receive', { method: 'post', data: params });
}
