import { useCallback, useState } from 'react';
import ShippingForm from './shippingForm';

// useCallback 更新state时候 不需要依赖state
function TodoList() {
	const [todos, setTodos] = useState<any[]>([]);

	const handleAppendTo = useCallback(({ text }) => {
		const newTodo = { text };
		setTodos((todos) => [...todos, newTodo]);
	}, []);

	return <span>{todos}</span>;
}


export default function ProductPage({ productId, referrer, theme }) {
	const handleSubmit = useCallback(
		(orderDetails) => {
			post('/product/' + productId + '/buy', {
				referrer,
				orderDetails,
			});
		},
		[productId, referrer],
	);
  
	// no useCallback  改变主题的时候 就会重新渲染了子组件
	// const handleSubmit = (orderDetails) => {
	// 	post('/product/' + productId + '/buy', {
	// 		referrer,
	// 		orderDetails,
	// 	});
	// };

	return (
		<div className={theme}>
			<ShippingForm onSubmit={handleSubmit} />
      <TodoList />
		</div>
	);
}

function post(url, data) {
	// Imagine this sends a request...
	console.log('POST /' + url);
	console.log(data);
}
