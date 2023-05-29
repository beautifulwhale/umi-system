import { Card } from 'antd';
import React from 'react';

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

	return (
		<>
			<Card style={{ height: '100vh' }}>
				<Card.Grid style={gridStyle}>这部分是搜索的</Card.Grid>
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
