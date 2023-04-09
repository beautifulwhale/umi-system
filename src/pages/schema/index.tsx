import { useModel, useNavigate } from '@umijs/max';
import { useEffect, useState } from 'react';
import {
	Button,
	Col,
	Form,
	Input,
	message,
	Row,
	Select,
	Space,
	Switch,
	Table,
} from 'antd';
import { InsureCategoryItem } from '@/services/insureCategories/type';
import { DoubleRightOutlined } from '@ant-design/icons';
import BreadcrumbCpn from '@/layout/breadcrumb';
import {
	getSubjectList,
	getSubjectTypeList,
	updateSubjectItem,
} from '@/services';
import {
	SubjectForm,
	SubjectListItemData,
	SubjectTypeListParams,
} from '@/services/subjectList/type';
import { patchString } from '@/utils';
import { ColumnsType } from 'antd/es/table';
import OperateDialog from './components/operateDialog';
import { Antd } from 'typings';

const Subject: React.FC = () => {
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [messageApi, contextHolder] = message.useMessage();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [initialValue, setInitalValue] = useState<SubjectListItemData>();
	const breadcrumbItems = [
		{
			title: (
				<>
					<DoubleRightOutlined />
					<span>基础配置</span>
				</>
			),
		},
		{
			title: '标的组件',
		},
	];
	// 表单查询
	const [subjectParams, setSubjectParams] = useState<SubjectForm>({
		code: '',
		label: '',
		riskId: '',
	});
	// 分页查询
	const [pageInfo, setPageInfo] = useState({
		pageNo: 1,
		pageSize: 10,
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [subjectList, setSubjectList] = useState<SubjectListItemData[]>([]);
	const [total, setTotal] = useState(0);
	const [sourceMetaSchemaList, setSourceMetaSchemaList] = useState<
		Antd.Select[]
	>([]);
	// 启用、禁用
	const handleChangeStatus = (isChecked: boolean, id: string) => {
		const updateParams = { status: isChecked ? 'T' : 'F', id };
		updateSubjectItem(updateParams).then(({ code }) => {
			if (code === 200) {
				messageApi.open({
					type: 'success',
					content: `${isChecked ? '启用成功' : '禁用成功'}`,
				});
			}
		});
	};
	// 新增、编辑弹窗
	const onAppendOrEdit = (record?: SubjectListItemData) => {
		const typeParams: SubjectTypeListParams = {
			pageNo: 1,
			pageSize: 100,
			params: {
				label: '',
				status: 'T',
				type: 'subject',
			},
		};
		getSubjectTypeList(typeParams).then(({ data }) => {
			const mapTypeSchemaList = data?.data.map((item) => ({
				label: item.label,
				value: item.id,
			}));
			setSourceMetaSchemaList(mapTypeSchemaList!);
		});
		if (record) {
			setInitalValue(record);
		}
		setIsModalOpen(true);
	};
	// 组件管理
	const componentManger = (record: SubjectListItemData) => {
		// params 参数
		// navigate(`/schema/manger/${record.metaSchemaId}/${record.id}`);
		// search 参数
		navigate(
			`/schema/manger?metaSchemaId=${record.metaSchemaId}&id=${record.id}&label=${record.label}`,
		);
		// state 参数
		// navigate('/schema/manger', {
		// 	state: { metaSchemaId: record.metaSchemaId, id: record.id },
		// });
	};
	const columns: ColumnsType<SubjectListItemData> = [
		{
			title: '标的组件',
			dataIndex: 'label',
			key: 'label',
		},
		{
			title: '标的编码',
			dataIndex: 'code',
			key: 'code',
		},
		{
			title: '险类名称',
			dataIndex: 'riskLabel',
			key: 'riskLabel',
		},
		{
			title: '启用状态',
			dataIndex: 'status',
			key: 'status',
			render: (text: string, record: SubjectListItemData) => (
				<Switch
					defaultChecked={text === 'T' ? true : false}
					onChange={(isChecked: boolean) =>
						handleChangeStatus(isChecked, record.id)
					}
				/>
			),
		},
		{
			title: '操作',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<a onClick={() => componentManger(record)}>组件管理</a>
					<a onClick={() => onAppendOrEdit(record)}>编辑</a>
				</Space>
			),
		},
	];
	const { insureList } = useModel('insureListModel', (model) => ({
		insureList: model.insureList,
		setInsureList: model.setInsureList,
	}));
	const insureLists = insureList.map((insure: InsureCategoryItem) => {
		return {
			label: insure.label,
			value: insure.id,
		};
	});
	// 获取标的列表
	const handleGetSubjectList = () => {
		const combineParams = { params: subjectParams, ...pageInfo };
		setLoading(true);
		getSubjectList(combineParams).then(({ data, code }) => {
			if (code === 200) {
				setSubjectList(data?.data as SubjectListItemData[]);
				setTotal(data?.total as number);
				setLoading(false);
			}
		});
	};
	useEffect(() => {
		handleGetSubjectList();
	}, [subjectParams, pageInfo]);
	const onFinish = (values: SubjectForm) => {
		patchString(values);
		setSubjectParams(values);
	};
	const changePageInfo = (page: number, pageSize: number) => {
		setPageInfo({ ...pageInfo, pageNo: page, pageSize });
	};
	const onReset = () => {
		form.resetFields();
		const initSubjectParams = patchString(subjectParams, false) as SubjectForm;
		// one:
		// setSubjectParams(initSubjectParams);
		// two:
		setSubjectParams((pre) => ({ ...pre, ...initSubjectParams }));
		const pageInfo = { pageNo: 1, pageSize: 10 };
		setPageInfo(pageInfo);
	};
	return (
		<>
			{contextHolder}
			<BreadcrumbCpn items={breadcrumbItems}></BreadcrumbCpn>
			<Form form={form} name="control-hooks" onFinish={onFinish}>
				<Row justify={'center'} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
					<Col span={8}>
						<Form.Item name="label" label="标的名称">
							<Input />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item name="riskId" label="险类名称">
							<Select
								placeholder="请选择险类"
								allowClear
								options={insureLists}
							></Select>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item name="code" label="标的编码">
							<Input />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item>
							<Space size="middle">
								<Button type="primary" htmlType="submit">
									查询
								</Button>
								<Button htmlType="button" onClick={onReset}>
									重置
								</Button>
								<Button
									type="primary"
									htmlType="button"
									onClick={() => onAppendOrEdit()}
								>
									新增
								</Button>
							</Space>
						</Form.Item>
					</Col>
				</Row>
			</Form>
			<Table
				columns={columns}
				dataSource={subjectList}
				loading={loading}
				rowKey={(record) => record.id}
				pagination={{
					total,
					pageSize: pageInfo.pageSize,
					defaultCurrent: pageInfo.pageNo,
					onChange: changePageInfo,
					showSizeChanger: true,
					pageSizeOptions: [5, 10, 20, 50],
				}}
			></Table>
			<OperateDialog
				isModalOpen={isModalOpen}
				sourceMetaSchemaList={sourceMetaSchemaList}
				initialValue={initialValue!}
				setIsModalOpen={(isModalOpen: boolean) => setIsModalOpen(isModalOpen)}
				setInitalValue={setInitalValue}
				handleGetSubjectList={handleGetSubjectList}
			></OperateDialog>
		</>
	);
};
export default Subject;
