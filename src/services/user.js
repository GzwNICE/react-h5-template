import { request } from '@/utils/request';

export async function getUserInfo() {
  return request('/app/v1/user/detail', { method: 'get' });
}
