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

export async function getHelpCenter(params) {
  return request('/app/help/center/page', { method: 'get', params: params });
}
export async function getHelpCenterItem(params) {
  return request('/app/help/center/page/text', { method: 'get', params: params });
}
export async function getHelpDetail(params) {
  return request('/app/help/center/text', { method: 'get', params: params });
}
export async function doGetAboutUs() {
  return request('/home/about/us/get/info', { method: 'get' });
}
export async function doGetRewardList(api) {
  return request(`/app/inviter/${api}/record/list`, { method: 'get' });
}

export async function requestData(params) {
  return request(params.url, { method: 'get' });
}
