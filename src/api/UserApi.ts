import { User } from '@/types'
import getUser from './mock/getUser'

export class UserApi {
  static async login(users_email: string, users_password: string): Promise<User> {
    // TODO Убрать комментарий
    // return await this.get('/publications', {sorting, search}) as Promise<TableItem[]>;
    return new Promise((resolve) => resolve(getUser()))
  }

  static async getUser(): Promise<User> {
    return new Promise((resolve) => resolve(getUser()))
  }

  static async logout(): Promise<unknown> {
    return new Promise((resolve) => resolve(true))
  }
}
