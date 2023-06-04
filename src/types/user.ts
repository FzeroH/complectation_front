import { ROLE_ADMINISTRATOR, ROLE_TEACHER, ROLE_LIBRARIAN, ROLE_BASE } from '@/const'

export type User = {
  first_name: string
  last_name: string
  users_email: string
  token: string
  role_name:
    | typeof ROLE_ADMINISTRATOR
    | typeof ROLE_TEACHER
    | typeof ROLE_LIBRARIAN
    | typeof ROLE_BASE
}
