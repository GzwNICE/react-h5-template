import { request } from '@/utils/request';

export async function getUserInfo() {
  return request('/app/v1/user/detail', { method: 'get' });
}

export async function commitUserInfo(params) {
  return request('/app/v1/user/edit/info', { method: 'post', data: params });
}
export async function doUpdateImage(params) {
  return request('/app/v1/file/upload', {
    method: 'post',
    data: params,
    Accept: 'multipart/form-data',
  });
}
export async function doAddMessage(params) {
  return request('/app/v1/user/feedback', { method: 'post', data: params });
}
