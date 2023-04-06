import '@umijs/max/typings';

declare namespace Axios {
	interface AxiosResult<T> {
		code: number;
		message: string;
		data?: T;
	}
}
declare namespace Antd {
	interface Select {
		label: string;
		value: string | number;
	}
}
