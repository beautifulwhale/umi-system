// dva user
export default {
	namespace: 'user',
	state: {
		userInfo: {},
		token: '',
		menuList: [],
	},
	reducers: {
		getUserInfo(state, { payload }) {
			return {
				...state,
				userInfo: payload,
			};
		},
		getToken(state, { payload }) {
			return {
				...state,
				token: payload,
			};
		},
		getMenuList(state, { payload }) {
			return {
				...state,
				menuList: payload,
			};
		},
	},
};
