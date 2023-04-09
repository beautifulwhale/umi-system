import { useSearchParams } from '@umijs/max';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import {
	arrayMove,
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { getSchemaList, SchemaItem } from '@/services';
import { Tooltip } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
	'data-row-key': string;
}
const SubjectManger: React.FC = () => {
	// const params = useParams()
	// console.log(params);
	// search 参数
	const [searchParams] = useSearchParams();
	const metaSchemaId = searchParams.get('metaSchemaId')!;
	// state 参数
	// console.log(useLocation());

	const [schemaList, setSchemaList] = useState<SchemaItem[]>([]);
	useEffect(() => {
		getSchemaList(metaSchemaId).then(({ code, data }) => {
			if (code === 200) setSchemaList(data?.items as SchemaItem[]);
		});
	}, [searchParams]);
	const mapSchemaType = (type: string) => {
		const target = {
			text: '文本',
			string: '字符串',
			array: '数组',
			number: '数字',
			object: '对象',
		};
		return target[type];
	};
	const columns: ColumnsType<SchemaItem> = [
		{
			title: '名称',
			dataIndex: 'label',
			key: 'label',
		},
		{
			title: '编码',
			dataIndex: 'code',
			key: 'code',
		},
		{
			title: '类型',
			dataIndex: 'type',
			key: 'type',
			render: (type: string) => mapSchemaType(type),
		},
		{
			title: '默认值',
			dataIndex: 'data',
			key: 'data',
			render: (data: string) => (data === '[null, null]' ? '' : data),
		},
		{
			title: '可见/必录',
			dataIndex: 'visible',
			key: 'visible',
			render: (visible: string) => (visible === 'T' ? '是' : '否'),
		},
		{
			title: '简介',
			dataIndex: 'note',
			key: 'note',
			render: (note: string) => <Tooltip title={note}>{note}</Tooltip>,
			ellipsis: {
				showTitle: false,
			},
		},
	];
	const tableProps = {
		dataSource: schemaList,
		columns,
	};
	const onDragEnd = ({ active, over }: DragEndEvent) => {
		if (active.id !== over?.id) {
			setSchemaList((prev) => {
				const activeIndex = prev.findIndex((i) => i.code === active.id);
				const overIndex = prev.findIndex((i) => i.code === over?.id);
				return arrayMove(prev, activeIndex, overIndex);
			});
		}
	};
	const Row = (props: RowProps) => {
		const {
			attributes,
			listeners,
			setNodeRef,
			transform,
			transition,
			isDragging,
		} = useSortable({
			id: props['data-row-key'],
		});		
		const style: React.CSSProperties = {
			...props.style,
			transform: CSS.Transform.toString(
				transform && { ...transform, scaleY: 1 },
			),
			transition,
			cursor: 'move',
			...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
		};

		return (
			<tr
				{...props}
				ref={setNodeRef}
				style={style}
				{...attributes}
				{...listeners}
			/>
		);
	};
	return (
		<>
			<DndContext onDragEnd={onDragEnd}>
				<SortableContext
					items={schemaList.map((item) => item.code)}
					strategy={verticalListSortingStrategy}
				>
					<Table
						components={{
							body: {
								row: Row,
							},
						}}
						{...tableProps}
						rowKey={(record) => record.code}
					></Table>
				</SortableContext>
			</DndContext>
		</>
	);
};
export default SubjectManger;
