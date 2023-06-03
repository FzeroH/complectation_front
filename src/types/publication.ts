import {
  STATUS_ACCEPTED,
  STATUS_DONE,
  STATUS_IN_PROCESSING,
  STATUS_ORDER,
  STATUS_PUBLISHING,
  STATUS_REFUSED,
} from '@/const'
import { ListItem } from './ui'

export type PublicationItem = {
  publcation_id: string
  cafedra_name: string
  publication_author: string
  publication_title: string
  company_name: string
  publication_year: number
  pub_type_name: number
}

export type StudentDisciplineItem = {
  discipline_name: ListItem
  students_group_type_name: string
  students_group: ListItem
  request_count: number
  students_discipline_semester: number
}

export type RecOtherInfo = {
  students_group_type: string
  students_discipline_semester: number
  request_count: number
  students_group_count: number
}

export type RecommendItem = {
  discipline: ListItem | null
  students_group: ListItem | null
  students_group_type: string
  students_discipline_semester: number
  request_count: number
  students_group_count: number
}

export type FullRecommendItem = {
  discipline_name: string
  students_group_type_name: string
  students_group_name: string
  students_discipline_semester: number
}

export type PublicationStatus =
  | typeof STATUS_IN_PROCESSING
  | typeof STATUS_ACCEPTED
  | typeof STATUS_PUBLISHING
  | typeof STATUS_DONE
  | typeof STATUS_REFUSED
  | typeof STATUS_ORDER

export type PublicationFullInfo = {
  id: number
  status: PublicationStatus
  cafedra_name: string
  publication_author: string
  publication_title: string
  company_name: string
  publication_year: number
  pub_type_name: string
  request_count: number
  publication_cost: number
  recommend_list: FullRecommendItem[]
}
