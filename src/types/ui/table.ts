import { DIRECTION_ASC, DIRECTION_DESC } from '@/const'
import { ListItem } from '.'

export type TableHeader = {
  title: string
  type: 'string' | 'number'
  name: string
  isSorting?: boolean
}

export type AdminTableHeader = TableHeader & {
  type: 'string' | 'number' | 'list'
  list?: ListItem[]
  disabled?: true
}

export type TableItem = Record<string, string | number | null> & { id: string | number }

export type DirectionSorting = typeof DIRECTION_ASC | typeof DIRECTION_DESC

export type SortingItem = {
  field: string
  direction: DirectionSorting
}
