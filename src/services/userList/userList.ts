import { request } from '@umijs/max';

export function userList(params: any) {
	return request(
		`/api/v1/system/user/list?pageNum=${params.pageNum}&pageSize=${params.pageSize}&deptId=${params.deptId}&mobile=${params.mobile}&status=${params.status}&keyWords=${params.keyWords}`,
		{
			method: 'GET',
		},
	);
}
