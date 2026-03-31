export interface User {
    id: number
    name: string
    email: string
    bio?: string | null
    avatar_url?: string | null
}

export interface Comment {
    id: number
    content: string
    created_at?: string
    user?: User
    replies?: Comment[]
}

export interface Post {
    id: number
    title: string
    content: string
    image_url?: string | null
    video_url?: string | null
    created_at?: string
    user?: {
        id: number
        name: string
        avatar_url?: string | null
    }
    comments?: Comment[]
    comments_count?: number
}