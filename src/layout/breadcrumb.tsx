import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import React from 'react';
import { Breadcrumb } from 'antd';

interface BreadcrumbProps {
	items: ItemType[];
	separator?: any;
}
const BreadcrumbCpn: React.FC<BreadcrumbProps> = ({ items, separator }) => {
	return (
		<>
			<div style={{ marginBottom: 30 }}>
				<Breadcrumb items={items} separator={separator} />
			</div>
		</>
	);
};
export default BreadcrumbCpn;
