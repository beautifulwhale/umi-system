import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import './index.less'

const UserContext = createContext(null);
const ThemeContext = createContext('light');

const initAuth = {
	token: '',
	userList: [],
};

function Panel({ children, title }) {
	const theme = useContext(ThemeContext)
	const className = `panel-${theme}`
	return (
		<>
			<section className={className}>
				<span className='title'>{title}</span>
				{children}
			</section>
		</>
	);
}

function Button({ children, onClick }) {
	const theme = useContext(ThemeContext)
	const className = `button-${theme}`

	return (<button type='button' className={className} onClick={onClick}>
		{children}
	</button>)
}

function Form() {
	return (
		<Panel title="useContext test">
			<Button>sign up</Button>
			<Button>log in</Button>
		</Panel>
	);
}

const auth = { token: 'sadfnasdfjkhas', userList: [{ name: 'bob', age: 18 }] }
const Login = React.memo(function Login({ name }) {
	const user = useContext(UserContext)

	const onClick = () => {
		console.log('user--->', user);
		user.login({ auth })
	}
	useEffect(() => {
		console.log('user effect', user);
	}, [user])

	return (
		<>
			<button type='button' onClick={onClick}>update user auth</button>
			<span>Login Success - {name}</span>
		</>
	)
})


const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return action.payload;
		default:
			return state;
	}
};

export default function UseContextTest() {
	// 使用state 管理改变的context
	const [theme, setTheme] = useState('light');

	const [auth, setAuth] = useState(initAuth);

	const [name, setName] = useState('Jack')
	// const [auth, dispatchAuth] = useReducer(authReducer, initAuth)


	// 当context value为函数、对象时可使用useCallback、useMemo进行性能优化

	// 未优化
	// function login({ auth }) {
	// 	setAuth(auth);
	// }

	// 优化
	const login = useCallback(({ auth }) => {
		setAuth(auth)
		// dispatchAuth({ type: 'LOGIN', payload: auth });
	}, [])

	const combineContext = useMemo(() => ({
		login,
		auth
	}), [login, auth])

	return (
		<>
			<ThemeContext.Provider value={theme}>
				<UserContext.Provider
					value={combineContext}
				>
					{/* test 覆盖 */}
					{/* <ThemeContext.Provider value='dark'>
						<Form />
					</ThemeContext.Provider> */}
					<Form />
					<Login name={name} />
				</UserContext.Provider>
			</ThemeContext.Provider>
			<div style={{ marginTop: '20px' }}>
				<Button onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark') }}>Toggle Theme</Button>
			</div>
			<MyComponent />
		</>
	);
}


function MyComponent() {
	const initialState = [1, 2];
	const [state, setState] = useState(initialState);
	const [count, setCount] = useState(initialState)
	console.log(state); // 第一次渲染: [1, 2]
	console.log(count);
	console.log('equal --?,', state === count);

	const handleClick = () => {
		setState([3, 4]);
	};

	return (
		<div>
			<p>{state[0]}, {state[1]}</p> {/* 渲染: 1, 2 */}
			<span>count: {count[1]} ---- {count[2]}</span>
			<button type='button' onClick={handleClick}>Update State</button>
		</div>
	);
}
