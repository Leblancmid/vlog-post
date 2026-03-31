import { api } from './axios'
import type { User } from '../types'

export const updateUser = async (payload: {
    name: string
    bio?: string
    avatar_url?: string
}): Promise<User> => {
    const { data } = await api.put('/api/user', payload)
    return data
}