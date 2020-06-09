import { request } from '@/utils/request';

export async function userExist(params) {
  return request('/app/v1/user/exist', { method: 'post', data: params });
}

export async function userLogin(params) {
  return request('/app/v1/user/login', { method: 'post', data: params });
}
