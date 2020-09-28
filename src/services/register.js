import { request } from '@/utils/request';

export async function regSendCode(params) {
    return request('/app/sms/send', { method: 'get', params: params });
}

export async function register(params) {
    return request('/v1/register.php', { method: 'post', data: params });
}

export async function getCode(params) {
    return request('/v1/captcha.php', { method: 'get', params: params });
}

export async function forgetPaw(params) {
    return request('/app/v1/user/recover/password/commit', { method: 'post', data: params });
}

export async function agreement(params) {
    return request('/home/agreement/info', { method: 'get', params: params });
}