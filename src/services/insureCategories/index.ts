import { request } from "@umijs/max";

// 获取险类列表
export const getInsuranceCategories = (online: any) => {
    return request<any>('/api/product/risk/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: online
    })
}