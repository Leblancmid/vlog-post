import { api } from './axios'

export async function getPosts() {
    const { data } = await api.get('/api/posts')
    return data
}

export async function getPost(id: string) {
    const { data } = await api.get(`/api/posts/${id}`)
    return data
}

export async function createPost(payload: {
    title: string
    content: string
    image_url?: string
    video_url?: string
}) {
    const { data } = await api.post('/api/posts', payload)
    return data
}