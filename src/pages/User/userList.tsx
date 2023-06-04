import { useEffect, useState } from 'react';
import {
	Button,
	Col,
	Form,
	Input,
	Row,
	Select,
	Space,
	Switch,
	Table,
	Tooltip,
	Typography,
	Image,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { connect, useDispatch } from '@umijs/max';

const statusList = [
	{ label: '启用', value: '1' },
	{ label: '禁用', value: '0' },
];

const UserList: React.FC<any> = ({ userList, total, deptId }) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	const [searchForm, setSearchForm] = useState({
		keyWords: '',
		mobile: '',
		status: '',
	});

	const [pageInfo, setPageInfo] = useState({
		pageNum: 1,
		pageSize: 10,
	});
	const [tableList, setTableList] = useState([]);
	const [totalNum, setTotal] = useState(0);
	const [loading, setLoading] = useState<boolean>(false);

	const columns: ColumnsType<any> = [
		{
			title: '序号',
			dataIndex: 'index',
			render: (text, record, index) => index + 1,
		},
		{
			title: '账户名称',
			dataIndex: 'userName',
			key: 'userName',
		},
		{
			title: '用户昵称',
			dataIndex: 'userNickname',
			key: 'userNickname',
		},
		{
			title: '用户头像',
			dataIndex: 'avatar',
			key: 'avatar',
			render: (text) => (
				<Image
					width={50}
					height={50}
					src={text}
					fallback="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
				/>
			),
		},
		{
			title: '部门',
			key: 'dept',
			render: (_, record) => record.dept?.deptName,
		},
		{
			title: '手机号',
			key: 'mobile',
			dataIndex: 'mobile',
		},
		{
			title: '用户状态',
			key: 'userStatus',
			dataIndex: 'userStatus',
			render: (text) => {
				return (
					<Switch
						checkedChildren="启用"
						unCheckedChildren="禁用"
						defaultChecked={text === 1 ? true : false}
					/>
				);
			},
		},
		{
			title: '创建时间',
			key: 'createdAt',
			dataIndex: 'createdAt',
			render: (text) => (
				<>
					<div style={{ maxWidth: 100 }}>
						<Tooltip title={text} color="pink">
							<Typography.Text ellipsis>{text}</Typography.Text>
						</Tooltip>
					</div>
				</>
			),
		},
		{
			title: '操作',
			key: 'operate',
			render: () => (
				<>
					<Button type="link">编辑</Button>
				</>
			),
		},
	];

	const changePageInfo = (pageNum: number, pageSize: number) => {
		setPageInfo({ ...pageInfo, pageNum, pageSize });
	};

	// 选择
	const rowSelection = {
		onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
			console.log(
				`selectedRowKeys: ${selectedRowKeys}`,
				'selectedRows: ',
				selectedRows,
			);
		},
		getCheckboxProps: (record: any) => ({
			disabled: record.userName === 'admin', // Column configuration not to be checked
			name: record.name,
		}),
	};

	const tableProps = {
		columns,
		dataSource: tableList,
		loading,
		rowKey: (record) => record.id,
		pagination: {
			total: totalNum,
			pageSize: pageInfo.pageSize,
			defaultCurrent: pageInfo.pageNum,
			showSizeChanger: true,
			pageSizeOptions: [5, 10, 20, 50],
			onChange: changePageInfo,
		},
		scroll: { x: 1000, y: 600 },
		rowSelection,
	};

	useEffect(() => {
		setLoading(true);
		setTableList(userList);
		setTotal(total);
		setLoading(false);
	}, [userList, total]);

	useEffect(() => {
		const getUserList = async () => {
			await dispatch({
				type: 'userList/getUserLists',
				payload: {
					...searchForm,
					...pageInfo,
					deptId,
				},
			});
		};

		getUserList();
	}, [searchForm, pageInfo, deptId]);

	const onFinish = (values: any) => {
		const { keyWords, mobile, status } = values;
		const filteredValues = {
			keyWords: keyWords || '',
			mobile: mobile || '',
			status: status || '',
		};
		setSearchForm(filteredValues);
	};

	const onReset = () => {
		form.resetFields();
		const initForm = {
			keyWords: '',
			mobile: '',
			status: '',
		};
		setSearchForm(initForm);
	};

	return (
		<>
			<Form form={form} onFinish={onFinish}>
				<Row justify={'center'} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
					<Col span={8}>
						<Form.Item name="keyWords" label="关键词">
							<Input />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item name="mobile" label="手机号码">
							<Input />
						</Form.Item>
					</Col>
					<Col span={5}>
						<Form.Item name="status" label="状态">
							<Select
								placeholder="请选择险类"
								allowClear
								options={statusList}
							></Select>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item>
							<Space size="middle">
								<Button
									style={{ backgroundColor: 'pink' }}
									type="primary"
									htmlType="submit"
								>
									查询
								</Button>
								<Button htmlType="button" onClick={onReset}>
									重置
								</Button>
							</Space>
						</Form.Item>
					</Col>
				</Row>
			</Form>
			<Table {...tableProps} />
		</>
	);
};
export default connect(({ userList }: any) => userList)(UserList);
