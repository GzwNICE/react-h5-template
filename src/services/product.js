import { request } from '@/utils/request';

export async function fetchRules(params) {
  return request('/app/activity/turns/last-order', { method: 'get', params: params });
}

export async function fetchInfo(params) {
  return request('/app/activity/turn/info', { method: 'get', params: params });
}

export async function fetchParticipants(params) {
  return request('/app/activity/order/participants', { method: 'get', params: params });
}

export async function fetchDrawCode(params) {
  return request('/app/activity/turns/my-turn-prizes-codes', { method: 'get', params: params });
}

export async function fetchBuy(params) {
  return request('/app/order/pay/info/lock', { method: 'post', data: params });
}

export async function fetchBuyConfirm(params) {
  return request('/app/order/pay/confirm', { method: 'post', data: params });
}

export async function fetchBuyCancel(params) {
  return request('/app/order/pay/cancel', { method: 'post', data: params });
}

export async function fetchExistRules(params) {
  return request('/app/prizes/exist/rules', { method: 'post', data: params });
}
