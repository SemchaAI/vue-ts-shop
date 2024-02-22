import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import type IUser from '@/models/IUser'
import { UserService } from '@/services/user.service'
import axios, { AxiosError } from 'axios'
import type { IAuthResponse } from '@/models/response/AuthResponce'

export const useUserStore = defineStore('user', () => {
  const state = ref({
    user: {} as IUser,
    isAuth: false,
    isLoading: false
  })
  const isLogin = computed(() => state.value.isAuth === true)
  const isAdmin = computed(() => state.value.user.role === 'ADMIN')

  function setAuth(bool: boolean) {
    state.value.isAuth = bool
  }
  function setUser(user: IUser) {
    state.value.user = user
  }
  function setLoading(bool: boolean) {
    state.value.isLoading = bool
  }

  async function login(email: string, password: string) {
    try {
      const response = await UserService.login(email, password)
      localStorage.setItem('auth', response.data.accessToken)
      setAuth(true)
      setUser(response.data.user)
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data?.message)
      } else {
        console.log('WTF WITH THIS ERROR?', e)
      }
    }
  }
  async function registration(email: string, password: string) {
    try {
      const response = await UserService.registration(email, password)
      localStorage.setItem('auth', response.data.accessToken)
      setAuth(true)
      setUser(response.data.user)
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data?.message)
      } else {
        console.log('WTF WITH THIS ERROR?', e)
      }
    }
  }
  async function logout() {
    try {
      const response = await UserService.logout()
      localStorage.removeItem('auth')
      setAuth(false)
      setUser({} as IUser)
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data?.message)
      } else {
        console.log('WTF WITH THIS ERROR?', e)
      }
    }
  }
  async function checkAuth() {
    setLoading(true)
    try {
      const response = await axios.get<IAuthResponse>(
        `${import.meta.env.VITE_BASE_URL}/user/refresh`,
        {
          withCredentials: true
        }
      )
      console.log(response)
      localStorage.setItem('auth', response.data.accessToken)
      setAuth(true)
      setUser(response.data.user)
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data?.message)
      } else {
        console.log('WTF WITH THIS ERROR?', e)
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    state,
    isAdmin,
    isLogin,
    setAuth,
    setUser,
    setLoading,
    login,
    registration,
    logout,
    checkAuth
  }
})
