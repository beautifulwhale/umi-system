// 部门管理树
import { request } from '@umijs/max';

export function upload(data: any) {
	return request('/api/v1/system/bigUpload/upload', {
		method: 'POST',
		data,
	});
}
