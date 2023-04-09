import { request } from '@umijs/max';
import { Axios } from 'typings';
import { SchemaInfo } from './type';
export * from './type';

// 根据metaSchemaId 获取schema列表
export const getSchemaList = (metaSchemaId: string) => {
	return request<Axios.AxiosResult<SchemaInfo>>(
		`api/product/meta/schema/get?metaSchemaId=${metaSchemaId}`,
		{
			method: 'GET',
		},
	);
};
