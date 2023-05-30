import { request } from '@umijs/max';

/**
 * 登录api接口集合
 * @method signIn 用户登录
 */
export function login(params: object) {
	return request('/api/v1/system/login', {
		data: params,
		method: 'POST',
	});
}

/**
 * 获取验证码
 */
export function captcha() {
	return request('/api/v1/pub/captcha/get', {
		method: 'GET',
	});
}
