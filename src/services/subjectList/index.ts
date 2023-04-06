import { request } from '@umijs/max';
import { Axios } from 'typings';
import {
	SubjectList,
	SubjectListItemData,
	SubjectListParams,
	SubjectSaveParams,
	SubjectType,
	SubjectTypeListParams,
	UpdateSubjectItem,
} from './type';

// 获取标的列表
export const getSubjectList = (data: SubjectListParams) => {
	return request<Axios.AxiosResult<SubjectList<SubjectListItemData[]>>>(
		'/api/product/subject/page',
		{
			method: 'POST',
			data,
		},
	);
};
// 更新标的列表状态
export const updateSubjectItem = (data: UpdateSubjectItem) => {
	const params = new URLSearchParams();
	params.append('id', data.id);
	params.append('status', data.status);
	return request<Axios.AxiosResult<null>>(
		'/api/product/subject/status/update',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			data: params,
		},
	);
};
// 获取新增标的类型列表
export const getSubjectTypeList = (data: SubjectTypeListParams) => {
	return request<Axios.AxiosResult<SubjectList<SubjectType[]>>>(
		'/api/product/internal/page',
		{
			method: 'POST',
			data,
		},
	);
};

// 新增/编辑保存标的基本信息
export const saveSubjectInfoMessage = (data: SubjectSaveParams) => {
	return request<Axios.AxiosResult<SubjectSaveParams>>(
		'/api/product/subject/save',
		{
			method: 'POST',
			data,
		},
	);
};
