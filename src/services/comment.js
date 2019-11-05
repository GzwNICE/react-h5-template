import { request } from '@/utils/request';

export async function query(params) {
  return request('/api/comments', { params });
}

export async function queryByPostId(id) {
  return request(`/api/posts/${id}/comments`);
}
