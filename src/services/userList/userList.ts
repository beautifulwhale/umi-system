import { request } from '@umijs/max';

/**
 * 登录api接口集合
 * @method signIn 用户登录
 */
export function userList(params: object) {
	return request('/api/v1/system/login', {
		data: params,
		method: 'POST',
	});
}
