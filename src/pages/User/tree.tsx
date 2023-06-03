import React, { useEffect, useMemo, useState } from 'react';
import { Input, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { connect } from '@umijs/max';

const { Search } = Input;

const dataList: { key: string; title: string }[] = [];
const generateList = (data: any[]) => {
	for (let i = 0; i < data.length; i++) {
		const node = data[i];
		const { key, title } = node;
		dataList.push({ key, title });

		if (node.children) {
			generateList(node.children);
		}
	}
};

const getParentKey = (key: React.Key, tree: DataNode[]): React.Key => {
	let parentKey: React.Key;
	for (let i = 0; i < tree.length; i++) {
		const node = tree[i];
		if (node.children) {
			if (node.children.some((item) => item.key === key)) {
				parentKey = node.key;
			} else if (getParentKey(key, node.children)) {
				parentKey = getParentKey(key, node.children);
			}
		}
	}
	return parentKey!;
};

const TreeDeps: React.FC<any> = ({ depsList }) => {
	const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
	const [searchValue, setSearchValue] = useState('');
	const [autoExpandParent, setAutoExpandParent] = useState(true);
	const [realDepsList, setRealDepsList] = useState([]);

	function mapDepartments(departments) {
		return departments.map((item) => {
			const mappedItem: any = {
				title: item.deptName,
				key: item.deptId,
			};

			if (item.children && item.children.length > 0) {
				mappedItem.children = mapDepartments(item.children);
			}

			return mappedItem;
		});
	}

	useEffect(() => {
		if (depsList.length > 0) {
			const list = mapDepartments(depsList);
			setRealDepsList(list);
			generateList(list);
		}
	}, [depsList]);

	const onExpand = (newExpandedKeys: React.Key[]) => {
		setExpandedKeys(newExpandedKeys);
		setAutoExpandParent(false);
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		const newExpandedKeys = dataList
			.map((item) => {
				if (item.title.indexOf(value) > -1) {
					return getParentKey(item.key, realDepsList);
				}
				return null;
			})
			.filter((item, i, self) => item && self.indexOf(item) === i);

		setExpandedKeys(newExpandedKeys as React.Key[]);
		setSearchValue(value);
		setAutoExpandParent(true);
	};

	const treeData = useMemo(() => {
		const loop = (data: DataNode[]): DataNode[] =>
			data.map((item) => {
				const strTitle = item.title as string;
				const index = strTitle.indexOf(searchValue);
				const beforeStr = strTitle.substring(0, index);
				const afterStr = strTitle.slice(index + searchValue.length);
				const title =
					index > -1 ? (
						<span>
							{beforeStr}
							<span
								className="site-tree-search-value"
								style={{ backgroundColor: '#F1D4E5' }}
							>
								{searchValue}
							</span>
							{afterStr}
						</span>
					) : (
						<span>{strTitle}</span>
					);
				if (item.children) {
					return { title, key: item.key, children: loop(item.children) };
				}

				return {
					title,
					key: item.key,
				};
			});

		return loop(realDepsList);
	}, [searchValue, realDepsList]);

	return (
		<div>
			<Search
				style={{ marginBottom: 8 }}
				placeholder="请输入部门名称"
				onChange={onChange}
			/>
			<Tree
				onExpand={onExpand}
				expandedKeys={expandedKeys}
				autoExpandParent={autoExpandParent}
				treeData={treeData}
			/>
		</div>
	);
};

export default connect(({ userList }: any) => userList)(TreeDeps);
