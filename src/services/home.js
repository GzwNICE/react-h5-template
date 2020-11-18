import { request } from '@/utils/request';

// login
export async function userLogin(params) {
  return request('/v1/login.php', { method: 'post', data: params });
}
// register
export async function register(params, head) {
  return request('/v1/register.php', { method: 'post', data: params });
}
