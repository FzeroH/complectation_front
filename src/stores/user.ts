import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { User } from '@/types'
import { ROLE_ADMINISTRATOR, ROLE_TEACHER, ROLE_LIBRARIAN, ROLE_BASE } from '@/const'

const users: User[] = [
  {
    first_name: 'Тестовый',
    last_name: 'Пользователь',
    users_password: 'pswd',
    users_email: 'user',
    token: 'ffwegfsgs',
    role_name: ROLE_TEACHER,
  },
]

const initialUser = (): User => ({
  first_name: '',
  last_name: '',
  users_password: '',
  users_email: '',
  token: '',
  role_name: ROLE_BASE,
})

export const useUserStore = defineStore('user', () => {
  const user = reactive<User>(initialUser())
  const hasUser = computed<boolean>(() => user.role_name !== ROLE_BASE)
  const isTeacher = computed<boolean>(() => user.role_name === ROLE_TEACHER)
  const isAdmin = computed<boolean>(() => user.role_name === ROLE_ADMINISTRATOR)
  const isLibrarian = computed<boolean>(() => user.role_name === ROLE_LIBRARIAN)

  function updateUser(newUser: User) {
	user.first_name = newUser.first_name
	user.last_name = newUser.last_name
	user.users_password = newUser.users_password
	user.users_email = newUser.users_email
	user.token = newUser.token
	user.role_name = newUser.role_name
  }

  function authUser(users_email: string, users_password: string) {
    let foundedUser = null

    // TODO Убрать комментарии
    // if (password) {
    // 	foundedUser = users.find(u => u.login === login && u.password === password)
    // } else {
    // 	const key = login;
    // 	foundedUser = users.find(u => u.key === key)
    // }
    foundedUser = users[0]

    if (foundedUser) updateUser(foundedUser)

    return foundedUser
  }

  function logout() {
	updateUser(initialUser())
  }

  return { user, logout, hasUser, authUser, isTeacher, isAdmin, isLibrarian }
})
