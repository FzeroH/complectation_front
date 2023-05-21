import { TableItem } from "@/types/ui";

export default (id: number): TableItem | null => ([
	{
	  id: 1,
	  cafedra_name: 'cafedra',
	  publication_author: 'author',
	  publication_title: 'title',
	  company_name: 'company name',
	  publication_year: 1997,
	  publication_cost: 4154,
	},
	{
		id: 2,
		cafedra_name: 'cafedra',
		publication_author: 'author',
		publication_title: 'title',
		company_name: 'company name',
		publication_year: 1997,
		publication_cost: 4154,
	  },
	  {
		id: 3,
		cafedra_name: 'cafedra',
		publication_author: 'author',
		publication_title: 'title',
		company_name: 'company name',
		publication_year: 1997,
		publication_cost: 4154,
	  },
	  {
		id: 4,
		cafedra_name: 'cafedra',
		publication_author: 'author',
		publication_title: 'title',
		company_name: 'company name',
		publication_year: 1997,
		publication_cost: 4154,
	  },
	  {
		id: 5,
		cafedra_name: 'cafedra',
		publication_author: 'author',
		publication_title: 'title',
		company_name: 'company name',
		publication_year: 1997,
		publication_cost: 4154,
	  },
	  {
		id: 6,
		cafedra_name: 'cafedra',
		publication_author: 'author',
		publication_title: 'title',
		company_name: 'company name',
		publication_year: 1997,
		publication_cost: 4154,
	  },

  ].find((item) => item.id === id) ?? null)