import { request } from '@/utils/request';

export async function getOrderList(params) {
  let path = '';
  if (params.type === 1) {
    path = '/app/v1/order/wait/luck/list'; //等待开奖
  } else if (params.type === 2) {
    path = '/app/v1/order/luck/list'; //已中奖
  } else if (params.type === 3) {
    path = '/app/v1/order/no/luck/list'; //未中奖
  }
  return request(path, { method: 'get', params: params });
}
