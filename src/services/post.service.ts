import type { IPost } from '@/components/todoList/todolist.interface'
import axios from 'axios'

export type TPostDTO = Omit<IPost, 'id'>

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const PostService = {
  async getAll() {
    return axios.get<IPost[]>('/posts')
  },
  async create(body: TPostDTO) {
    return axios.post<IPost>('/posts', body, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  async delete(id: number) {
    return axios.delete(`/posts/${id}`)
  }
}
