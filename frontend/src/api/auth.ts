import { api } from './axios'

export async function getCsrfCookie() {
    await api.get('/sanctum/csrf-cookie')
}

export async function login(payload: { email: string; password: string }) {
    await getCsrfCookie()
    const { data } = await api.post('/login', payload)
    return data
}

export async function logout() {
    const { data } = await api.post('/logout')
    return data
}

export async function getMe() {
    const { data } = await api.get('/api/me')
    return data
}