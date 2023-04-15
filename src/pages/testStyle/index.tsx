import React, { useEffect } from 'react';

// use css 没有作用域 互相影响
import './index.css';

// less内置 cssModule 推荐
import styles from './index.less';

// tailwindcss内置 可以直接使用微生成器
// umi g tailwindcss
export default () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		fetch('/api/users').then((res) => {
			console.log('res-->', res);
		});
	});
	return (
		<>
			<div className="cssBlock"></div>
			<div className={styles.parent}>
				<div className={styles.child}></div>
			</div>
			<div className="bg-red-300 w-5 h-5"></div>
		</>
	);
};
