import { AxiosResponse, RequestConfig } from '@umijs/max'
import { notification } from 'antd';

const baseUrl = process.env.NODE_ENV === 'production' ? '/uat' : '/dev';
const DEFAULT_REQUEST_TIMEOUT_TIME = 3000;
const token = window.localStorage.getItem('token')
const codeMessage = {
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。'
}

interface ResponseStructure {
    success: boolean;
    code: number;
    data: any;
    errorCode?: number;
    errorMessage?: string;
}
// 错误处理
const errorHandler = (error: any) => {
    const { response } = error;
    if (response && response.status) {
        const errorText = codeMessage[response.status] || response.statusText;
        const { status, url } = response;
        notification.error({
            message: `请求错误${status}:${url}`,
            description: errorText
        })
    } else if (!response) {
        notification.error({
            description: '网络异常，无法连接服务器',
            message: '网络异常',
        });
        return response;
    }
}
export const request: RequestConfig = {
    baseURL: baseUrl,
    timeout: DEFAULT_REQUEST_TIMEOUT_TIME,
    headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    errorConfig: {
        errorHandler
    },
    requestInterceptors: [
        (config: RequestConfig) => {
            return { ...config };
        }
    ],
    responseInterceptors: [
        (response) => {
            const { data } = response as AxiosResponse<ResponseStructure>;
            if (!data.success) {
                notification.error({
                    message: '请求失败'
                });
            }
            return response;
        }
    ]
}