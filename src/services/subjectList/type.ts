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
    }
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
export interface SubjectList {
    data: SubjectListItemData[];
    pageSize: number
    pageNo: number
    total: number
}
export interface SubjectForm {
    code: string,
    label: string,
    riskId: string
}
export interface SubjectColumnsDataType {
    key: string
    label: string
    code: string
    riskLabel: string
    status: string
}
export interface UpdateSubjectItem {
    id: string
    status: string
}