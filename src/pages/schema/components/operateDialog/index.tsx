import { saveSubjectInfoMessage } from '@/services';
import { InsureCategoryItem } from '@/services/insureCategories/type';
import { SubjectSaveParams } from '@/services/subjectList/type';
import { useModel } from '@umijs/max';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import React from 'react';
import { Antd } from 'typings';

interface DialogProps {
	isModalOpen: boolean;
	sourceMetaSchemaList: Antd.Select[];
	setIsModalOpen: (isModalOpen: boolean) => void;
	handleGetSubjectList: () => void;
}
const EditOrAppendDialog: React.FC<DialogProps> = ({
	isModalOpen,
	setIsModalOpen,
	sourceMetaSchemaList,
	handleGetSubjectList,
}) => {
	const [form] = Form.useForm();
	const [messageApi, contextHolder] = message.useMessage();
	const { TextArea } = Input;
	const handleCancel = () => {
		setIsModalOpen(false);
		form.resetFields();
	};
	const handleOk = () => {
		form.validateFields().then((values) => {
			const combineParams: SubjectSaveParams = {
				...values,
				id: -1,
				status: 'F',
			};
			saveSubjectInfoMessage(combineParams).then(({ code }) => {
				if (code === 200) {
					messageApi.success('新增成功');
					handleGetSubjectList();
					handleCancel();
					setIsModalOpen(false);
				}
			});
		});
	};
	// 险类列表
	const { insureList } = useModel('insureListModel', (model) => ({
		insureList: model.insureList,
	}));
	const insureMapList = insureList.map((insure: InsureCategoryItem) => {
		return {
			label: insure.label,
			value: insure.id,
		};
	});
	return (
		<>
			{contextHolder}
			<Modal
				title="新增标的组件"
				footer={[
					<Button key="back" onClick={handleCancel}>
						取消
					</Button>,
					<Button key="submit" type="primary" onClick={handleOk}>
						保存
					</Button>,
				]}
				centered={true}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form form={form} name="subjectForm">
					<Form.Item
						label="险类名称"
						name="riskId"
						rules={[{ required: true, message: 'Please input your riskId!' }]}
					>
						<Select options={insureMapList} />
					</Form.Item>
					<Form.Item
						label="名称"
						name="label"
						rules={[{ required: true, message: 'Please input your label!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="编码"
						name="code"
						rules={[{ required: true, message: 'Please input your code!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="类型"
						name="sourceMetaSchemaId"
						rules={[
							{
								required: true,
								message: 'Please input your sourceMetaSchemaId!',
							},
						]}
					>
						<Select allowClear options={sourceMetaSchemaList} />
					</Form.Item>
					<Form.Item label="备注" name="description">
						<TextArea rows={4} />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default EditOrAppendDialog;
