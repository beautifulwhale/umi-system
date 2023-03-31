import { request } from "@umijs/max";
import { Axios } from "typings";
import { InsureCategoryItem } from "./type";

// 获取险类列表
export const getInsuranceCategories = (online: any) => {
    return request<Axios.AxiosResult<InsureCategoryItem[]>>('/api/product/risk/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: online
    })
}