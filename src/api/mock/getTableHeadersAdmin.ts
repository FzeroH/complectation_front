import { AdminTableHeader } from "@/types/ui";

export default (): AdminTableHeader[] => ([
	{
		title: 'header 1',
		type: 'string',
		name: 'header_1',
	},
	{
		title: 'header 2',
		type: 'string',
		name: 'header_2',
	},
	{
		title: 'num header 1',
		type: 'number',
		name: 'num_header_1',
	},
	{
		title: 'list header 1',
		type: 'number',
		name: 'list_header_1',
		list: [
			{
			title: 'list 1',
			value: 1,
		},
		{
			title: 'list 2',
			value: 2,
		},
		{
			title: 'list 3',
			value: 3,
		},
	]
	},
])