export interface SchemaInfo {
	id: string;
	deprecated: string;
	editState: string;
	scriptRules: any[];
	sourceId: string;
	sourceInternal: string;
	type: string;
	items: SchemaItem[];
}
export interface SchemaItem {
	changed: string;
	code: string;
	data: string;
	deprecated: string;
	fixed: string;
	grouped: number;
	label: string;
	maxLength: number;
	note: string;
	proposalField: string;
	referData: string;
	reference: string;
	type: string;
	visible: string;
}
