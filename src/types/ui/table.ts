export type TableHeader = {
	title: string;
	type: 'string' | 'number';
	name: string;
	list?: string;
}

export type TableItem = Record<string, string | number> & { id: string | number };

