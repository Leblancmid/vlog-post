import { api } from './axios'
import type { User } from '../types'

export async function updateUser(payload: {
    name: string
    bio?: string
    avatar?: File | null
}): Promise<User> {
    const formData = new FormData()
    formData.append('name', payload.name)

    if (payload.bio) {
        formData.append('bio', payload.bio)
    }

    if (payload.avatar) {
        formData.append('avatar', payload.avatar)
    }

    const { data } = await api.post('/api/user', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })

    return data
}