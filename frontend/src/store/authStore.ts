import { create } from 'zustand'
import { getMe, login as loginRequest, logout as logoutRequest } from '../api/auth'

export interface AuthUser {
    id: number
    name: string
    email: string
    bio?: string | null
    avatar_url?: string | null
}

type AuthState = {
    user: AuthUser | null
    setUser: (user: AuthUser) => void
    isAuthenticated: boolean
    isLoading: boolean
    bootstrap: () => Promise<void>
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,

    setUser: (user) =>
        set({
            user,
            isAuthenticated: true,
        }),

    bootstrap: async () => {
        set({ isLoading: true })

        try {
            const response = await getMe()

            set({
                user: response.user,
                isAuthenticated: true,
                isLoading: false,
            })
        } catch {
            set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
            })
        }
    },

    login: async (email, password) => {
        set({ isLoading: true })

        const response = await loginRequest({ email, password })

        set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
        })
    },

    logout: async () => {
        await logoutRequest()

        set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        })
    },
}))