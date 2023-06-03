// 部门管理树
import { request } from '@umijs/max';

export function depsTree() {
	return request('/api/v1/system/dept/treeSelect', {
		method: 'GET',
	});
}
