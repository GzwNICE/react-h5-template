import { request } from '@/utils/request';

// login
export async function userLogin(params) {
  return request('/v1/login.php', { method: 'post', data: params });
}
