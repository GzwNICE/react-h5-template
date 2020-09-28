import { request } from '@/utils/request';

export async function userExist(params) {
  return request('/app/v1/user/exist', { method: 'post', data: params });
}

export async function userLogin(params) {
  return request('/login.php', { method: 'post', data: params });
}
export async function getUserInfo() {
  return request('/app/v1/user/detail', { method: 'get' });
}
