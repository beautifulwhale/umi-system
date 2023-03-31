import '@umijs/max/typings';

declare namespace Axios {
    interface AxiosResult<T> {
        code: number
        message: string
        data?: T
    }
}