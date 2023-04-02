import { request } from "@umijs/max";
import { Axios } from "typings";
import { SubjectList, SubjectListParams, UpdateSubjectItem } from "./type";

// 获取标的列表
export const getSubjectList = (data: SubjectListParams) => {
    return request<Axios.AxiosResult<SubjectList>>('/api/product/subject/page', {
        method: 'POST',
        data
    })
}
// 更新标的列表状态
export const updateSubjectItem = (data: UpdateSubjectItem) => {
    const params = new URLSearchParams()
    params.append('id', data.id)
    params.append('status', data.status)
    return request<Axios.AxiosResult<null>>('/api/product/subject/status/update', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        data: params
    })
}