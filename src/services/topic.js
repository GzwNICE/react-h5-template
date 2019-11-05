import { request } from '@/utils/request';

export async function query(params) {
  return request('/api/posts', { params });
}

export async function queryCurrent(id) {
  return request(`/api/posts/${id}`);
}

export async function post(params) {
  return request(`/api/posts`, { method: 'post', data: params });
}

export async function patch(id, params) {
  return request(`/api/posts/${id}`, { method: 'patch', data: params });
}

export async function remove(id) {
  return request(`/api/posts/${id}`, { method: 'delete' });
}
