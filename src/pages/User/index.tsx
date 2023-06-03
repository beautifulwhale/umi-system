import { Card } from 'antd';
import React, { useEffect } from 'react';
import Tree from './tree';
import { useDispatch } from '@umijs/max';

const UserManger: React.FC = () => {
	const gridStyle: React.CSSProperties = {
		width: '25%',
		height: '75%',
		textAlign: 'center',
	};
	const listStyle: React.CSSProperties = {
		width: '73%',
		height: '100%',
		marginLeft: '20px',
		textAlign: 'center',
	};

	const dispatch = useDispatch();

	useEffect(() => {
		// 获取部分树
		const getDepsList = async () => {
			await dispatch({
				type: 'userList/getDeps',
			});
		};

		getDepsList();
	}, []);

	return (
		<>
			<Card style={{ height: '100vh' }}>
				<Card.Grid style={gridStyle}>
					<Tree />
				</Card.Grid>
				<Card.Grid style={listStyle}>
					<ul>
						<li>这部分是列表的</li>
						<li>这部分是列表的</li>
						<li>这部分是列表的</li>
						<li>这部分是列表的</li>
						<li>这部分是列表的</li>
						<li>这部分是列表的</li>
						<li>这部分是列表的</li>
					</ul>
				</Card.Grid>
			</Card>
		</>
	);
};
export default UserManger;
