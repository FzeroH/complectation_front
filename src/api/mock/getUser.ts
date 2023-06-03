import { ROLE_TEACHER } from "@/const";
import { User } from "@/types";

export default (): User => ({
  first_name: 'Тестовый',
  last_name: 'Пользователь',
  users_password: 'pswd',
  users_email: 'user',
  token: 'ffwegfsgs',
  role_name: ROLE_TEACHER,
})
