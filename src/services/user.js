import { request } from '@/utils/request';

export async function getUserInfo() {
  return request('/app/v1/user/detail', { method: 'get' });
}
export async function getGoMoney() {
  return request('/app/inviter/reward/go/money', { method: 'get' });
}
export async function commitUserInfo(params) {
  return request('/app/v1/user/edit/info', { method: 'post', data: params });
}
export async function doUpdateImage(params) {
  return request('/app/v1/file/upload', {
    method: 'post',
    requestType: 'form',
    data: params,
  });
}
export async function doAddMessage(params) {
  return request('/app/v1/user/feedback', { method: 'post', data: params });
}
export async function doSaveAddress(params) {
  let path = '';
  if (params.id) {
    path = '/app/user/address/update';
  } else {
    path = '/app/user/address/add';
  }
  return request(path, { method: 'post', data: params });
}
/**
 * 收货地址列表接口
 */
export async function requestAddressList() {
  return request('/app/user/address/list', { method: 'get' });
}
