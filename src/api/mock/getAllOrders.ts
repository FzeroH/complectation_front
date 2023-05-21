import { STATUS_ACCEPTED, STATUS_DONE, STATUS_IN_PROCESSING, STATUS_PUBLISHING, STATUS_REFUSED } from '@/const'
import { PublicationFullInfo } from '@/types'

export default (): PublicationFullInfo[] => [
  {
    id: 1,
	status: STATUS_IN_PROCESSING,
    cafedra_name: 'cafedra name',
    publication_author: 'publication author',
    publication_title: 'publication title',
    company_name: 'company name',
    publication_year: 3143,
    pub_type_name: 'publication_year',
    request_count: 11,
    publication_cost: 123,
    recommend_list: [
      {
        discipline_name: 'string',
        students_group_type_name: 'string',
        students_group_name: 'group_name',
        students_discipline_semester: 3,
      },
      {
        discipline_name: '3 1',
        students_group_type_name: 'gd g',
        students_group_name: 'group name',
        students_discipline_semester: 2,
      },
      {
        discipline_name: 'name',
        students_group_type_name: 'type',
        students_group_name: 'group_name',
        students_discipline_semester: 4,
      },
    ],
  },

  {
    id: 2,
	status: STATUS_ACCEPTED,
    cafedra_name: 'cafedra name',
    publication_author: 'publication author',
    publication_title: 'publication title',
    company_name: 'company name',
    publication_year: 3143,
    pub_type_name: 'publication_year',
    request_count: 11,
    publication_cost: 123,
    recommend_list: [
      {
        discipline_name: 'string',
        students_group_type_name: 'string',
        students_group_name: 'group_name',
        students_discipline_semester: 3,
      },
      {
        discipline_name: '3 1',
        students_group_type_name: 'gd g',
        students_group_name: 'group name',
        students_discipline_semester: 2,
      },
      {
        discipline_name: 'name',
        students_group_type_name: 'type',
        students_group_name: 'group_name',
        students_discipline_semester: 4,
      },
    ],
  },

  {
    id: 3,
	status: STATUS_DONE,
    cafedra_name: 'cafedra name',
    publication_author: 'publication author',
    publication_title: 'publication title',
    company_name: 'company name',
    publication_year: 3143,
    pub_type_name: 'publication_year',
    request_count: 11,
    publication_cost: 123,
    recommend_list: [
      {
        discipline_name: 'string',
        students_group_type_name: 'string',
        students_group_name: 'group_name',
        students_discipline_semester: 3,
      },
      {
        discipline_name: '3 1',
        students_group_type_name: 'gd g',
        students_group_name: 'group name',
        students_discipline_semester: 2,
      },
      {
        discipline_name: 'name',
        students_group_type_name: 'type',
        students_group_name: 'group_name',
        students_discipline_semester: 4,
      },
    ],
  },

  {
    id: 4,
	status: STATUS_PUBLISHING,
    cafedra_name: 'cafedra name',
    publication_author: 'publication author',
    publication_title: 'publication title',
    company_name: 'company name',
    publication_year: 3143,
    pub_type_name: 'publication_year',
    request_count: 11,
    publication_cost: 123,
    recommend_list: [
      {
        discipline_name: 'string',
        students_group_type_name: 'string',
        students_group_name: 'group_name',
        students_discipline_semester: 3,
      },
      {
        discipline_name: '3 1',
        students_group_type_name: 'gd g',
        students_group_name: 'group name',
        students_discipline_semester: 2,
      },
      {
        discipline_name: 'name',
        students_group_type_name: 'type',
        students_group_name: 'group_name',
        students_discipline_semester: 4,
      },
    ],
  },

  {
    id: 5,
	status: STATUS_REFUSED,
    cafedra_name: 'cafedra name',
    publication_author: 'publication author',
    publication_title: 'publication title',
    company_name: 'company name',
    publication_year: 3143,
    pub_type_name: 'publication_year',
    request_count: 11,
    publication_cost: 123,
    recommend_list: [
      {
        discipline_name: 'string',
        students_group_type_name: 'string',
        students_group_name: 'group_name',
        students_discipline_semester: 3,
      },
      {
        discipline_name: '3 1',
        students_group_type_name: 'gd g',
        students_group_name: 'group name',
        students_discipline_semester: 2,
      },
      {
        discipline_name: 'name',
        students_group_type_name: 'type',
        students_group_name: 'group_name',
        students_discipline_semester: 4,
      },
    ],
  },
]
