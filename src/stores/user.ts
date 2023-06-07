import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { User } from '@/types'
import { ROLE_ADMINISTRATOR, ROLE_TEACHER, ROLE_LIBRARIAN, ROLE_BASE, USER_STORAGE_NAME } from '@/const'
import { UserApi } from '@/api'
import axios from "axios";

const initialUser = (): User => ({
    users_id: 0,
    first_name: '',
    last_name: '',
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
      user.users_id = newUser.users_id
      user.first_name = newUser.first_name
      user.last_name = newUser.last_name
      user.users_email = newUser.users_email
      user.token = newUser.token
      user.role_name = newUser.role_name

	sessionStorage.setItem(USER_STORAGE_NAME, JSON.stringify({...newUser}))

      if (newUser.token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${newUser.token}`
      } else {
          delete axios.defaults.headers.common['Authorization']
      }
  }

  async function authUser(users_email?: string, users_password?: string) {
    let foundedUser = null

    if (users_email && users_password) {
    	foundedUser = await UserApi.login(users_email, users_password);
    } else {
		const sessionUserStr = sessionStorage.getItem(USER_STORAGE_NAME)
		if (sessionUserStr) {
			const sessionUser = JSON.parse(sessionUserStr) as User;
			const token = sessionUser.token;

			if (token) {
                foundedUser = await UserApi.getUser()
                foundedUser.token = token
            };
		}
    }

    if (foundedUser) updateUser(foundedUser)
	else sessionStorage.removeItem(USER_STORAGE_NAME)

    return foundedUser
  }

  async function logout() {
	await UserApi.logout();
	sessionStorage.removeItem(USER_STORAGE_NAME)
    updateUser(initialUser())

  }

  return { user, logout, hasUser, authUser, isTeacher, isAdmin, isLibrarian }
})
