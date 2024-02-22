import server from '@/http'
import type IUser from '@/models/IUser'
import type { IAuthResponse } from '@/models/response/AuthResponce'
import {
  USER_ROUTE_LOGIN,
  USER_ROUTE_LOGOUT,
  USER_ROUTE_REGISTRATION,
  USER_ROUTE_USERS
} from '@/utils/consts'
import type { AxiosResponse } from 'axios'

export const UserService = {
  async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return server.post<IAuthResponse>(USER_ROUTE_LOGIN, { email, password })
  },
  async registration(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return server.post<IAuthResponse>(USER_ROUTE_REGISTRATION, { email, password })
  },
  async logout(): Promise<void> {
    return server.post(USER_ROUTE_LOGOUT)
  },
  async getAllUsers(): Promise<AxiosResponse<IUser[]>> {
    return server.get<IUser[]>(USER_ROUTE_USERS)
  }
}
