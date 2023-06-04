import { User } from '@/types'
import { Api } from "@/api/Api";

export class UserApi extends Api{
  static async login(users_email: string, users_password: string): Promise<User> {
    return await this.post('/auth/login', {users_email, users_password}) as Promise<User>;
  }

  static async getUser(): Promise<User> {
    return await this.get('/user') as Promise<User>
  }

  static async logout(): Promise<unknown> {
    return new Promise((resolve) => resolve(true))
  }
}
