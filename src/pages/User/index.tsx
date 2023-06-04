import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from '@umijs/max';
import TreeDeps from './tree';
import UserList from './userList';

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
	const [deptId, setDeptId] = useState('');

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

	const getDeptId = (id: string) => {
		setDeptId(id);
	};

	return (
		<>
			<Card style={{ height: '100vh' }}>
				<Card.Grid style={gridStyle}>
					<TreeDeps getDeptId={getDeptId} />
				</Card.Grid>
				<Card.Grid style={listStyle}>
					<UserList deptId={deptId}></UserList>
				</Card.Grid>
			</Card>
		</>
	);
};
export default UserManger;
