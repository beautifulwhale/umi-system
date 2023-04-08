import { saveSubjectInfoMessage } from '@/services';
import { InsureCategoryItem } from '@/services/insureCategories/type';
import {
	SubjectListItemData,
	SubjectSaveParams,
} from '@/services/subjectList/type';
import { useModel } from '@umijs/max';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Antd } from 'typings';

interface DialogProps {
	isModalOpen: boolean;
	sourceMetaSchemaList: Antd.Select[];
	setIsModalOpen: (isModalOpen: boolean) => void;
	handleGetSubjectList: () => void;
	initialValue: SubjectListItemData;
	setInitalValue: (initialValue: any) => void;
}
const EditOrAppendDialog: React.FC<DialogProps> = ({
	isModalOpen,
	setIsModalOpen,
	sourceMetaSchemaList,
	handleGetSubjectList,
	initialValue,
	setInitalValue,
}) => {
	const [form] = Form.useForm();
	const formRef = useRef(null);
	const [messageApi, contextHolder] = message.useMessage();
	const [operateFlag, setOperateFlag] = useState('');
	const { TextArea } = Input;
	const handleCancel = () => {
		setIsModalOpen(false);
		form.resetFields();
		setInitalValue(null);
	};
	const handleOk = () => {
		form.validateFields().then((values) => {
			const combineParams: SubjectSaveParams = {
				...values,
				id: operateFlag === 'editType' ? initialValue.id : -1,
				status: 'F',
			};
			saveSubjectInfoMessage(combineParams).then(({ code }) => {
				if (code === 200) {
					messageApi.success(
						`${operateFlag === 'editType' ? '编辑成功' : '新增成功'}`,
					);
					handleGetSubjectList();
					handleCancel();
					setIsModalOpen(false);
				}
			});
		});
	};
	useEffect(() => {
		if (formRef.current) {
			if (initialValue) {
				const initForm = {
					label: initialValue.label,
					code: initialValue.code,
					riskId: initialValue.riskId,
					sourceMetaSchemaId: initialValue.sourceMetaSchemaId,
					description: initialValue.description,
				};
				form.setFieldsValue(initForm);
				setOperateFlag('editType');
			}
		}
	}, [form, initialValue]);
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
				<Form form={form} name="subjectForm" ref={formRef}>
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
