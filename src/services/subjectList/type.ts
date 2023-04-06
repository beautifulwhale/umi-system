export interface SubjectListParams {
	pageNo: number;
	pageSize: number;
	params: {
		code: string;
		coverageId?: string;
		ensuranceId?: string;
		label: string;
		riskId: string;
		status?: string;
	};
}
export interface SubjectTypeListParams {
	pageNo: number;
	pageSize: number;
	params: {
		code?: string;
		label: string;
		type: string;
		status?: string;
	};
}
export interface SubjectListItemData {
	id: string;
	code: string;
	riskId: string;
	metaSchemaId: string;
	label: string;
	description: string;
	status: string;
	creator: string;
	createTime: string;
	modifier: string;
	modifyTime: string;
	sourceMetaSchemaId: string;
	riskLabel: string;
	isCalc: null;
	relationReportSubject: null;
}
export interface SubjectList<T> {
	data: T;
	pageSize: number;
	pageNo: number;
	total: number;
}
export interface SubjectForm {
	code: string;
	label: string;
	riskId: string;
}
export interface SubjectColumnsDataType {
	key: string;
	label: string;
	code: string;
	riskLabel: string;
	status: string;
}
export interface UpdateSubjectItem {
	id: string;
	status: string;
}
export interface SubjectType {
	createTime: string;
	creator: string;
	description: string;
	id: string;
	label: string;
	metaSchemaId: string;
	modifier: string;
	modifyTime: string;
	status: string;
	type: string;
}
export interface SubjectSaveParams {
	code: string;
	createTime?: string;
	creator?: string;
	description?: string;
	id: string;
	isCalc?: string;
	label: string;
	metaSchemaId?: string;
	modifier?: string;
	modifyTime?: string;
	relationReportSubject?: string;
	riskId: string;
	riskLabel?: string;
	sourceMetaSchemaId: string;
	status: string;
}
