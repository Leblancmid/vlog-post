import { api } from './axios'
import type { Post } from '../types'

export interface PaginatedPosts {
    data: Post[]
    current_page: number
    last_page: number
}

export const getPosts = async (page = 1): Promise<PaginatedPosts> => {
    const res = await api.get(`/api/posts?page=${page}`)
    return res.data
}

export async function getPost(id: string) {
    const { data } = await api.get(`/api/posts/${id}`)
    return data
}

export async function createPost(payload: FormData) {
    const { data } = await api.post('/api/posts', payload)
    return data
}