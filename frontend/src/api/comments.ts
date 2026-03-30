import { api } from './axios'

export async function addComment(postId: string, payload: { content: string }) {
    const { data } = await api.post(`/api/posts/${postId}/comments`, payload)
    return data
}

export async function replyToComment(commentId: string, payload: { content: string }) {
    const { data } = await api.post(`/api/comments/${commentId}/replies`, payload)
    return data
}