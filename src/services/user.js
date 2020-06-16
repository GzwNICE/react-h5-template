import { request } from '@/utils/request';

export async function getUserInfo() {
  return request('/app/v1/user/detail', { method: 'get' });
}

export async function commitUserInfo(params) {
  return request('/app/v1/user/edit/info', { method: 'post', data: params });
}
