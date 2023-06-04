import { depsTree, userList } from '@/services';

// 用户管理
export default {
	namespace: 'userList',
	state: {
		depsList: [],
		userList: [],
		total: 0,
	},
	reducers: {
		getDepsList(state, { payload }) {
			return {
				...state,
				depsList: payload,
			};
		},
		getUserList(state, { payload }) {
			return {
				...state,
				userList: payload,
			};
		},
		getTotal(state, { payload }) {
			return {
				...state,
				total: payload,
			};
		},
	},
	effects: {
		*getDeps(_, { put, call }) {
			const res = yield call(depsTree);
			yield put({ type: 'getDepsList', payload: res.data.deps });
		},
		*getUserLists({ payload }, { put, call }) {
			const res = yield call(userList, payload);
			yield put({ type: 'getUserList', payload: res.data.userList });
			yield put({ type: 'getTotal', payload: res.data.total });
		},
	},
};
