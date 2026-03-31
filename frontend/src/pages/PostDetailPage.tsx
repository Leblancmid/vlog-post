import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { addComment, replyToComment } from '../api/comments'
import { getPost } from '../api/posts'
import type { Post } from '../types'

export function PostDetailPage() {
    const { id } = useParams()
    const [post, setPost] = useState<Post | null>(null)
    const [comment, setComment] = useState('')

    const loadPost = async () => {
        if (!id) return
        const data = await getPost(id)
        setPost(data)
    }

    useEffect(() => {
        void loadPost()
    }, [id])

    const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!id || !comment.trim()) return

        await addComment(id, { content: comment })
        setComment('')
        await loadPost()
    }

    const handleReply = async (commentId: number) => {
        const content = window.prompt('Write a reply')
        if (!content?.trim()) return

        await replyToComment(String(commentId), { content })
        await loadPost()
    }

    if (!post) {
        return <div>Loading post...</div>
    }

    return (
        <div className="max-w-3xl space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="mb-2 text-2xl font-bold text-slate-900">{post.title}</h1>

                <p className="mb-4 text-sm text-slate-500">
                    By {post.user?.name ?? 'Unknown'}
                </p>

                <p className="whitespace-pre-line text-slate-700">
                    {post.content}
                </p>

                {/* 👇 ADD THIS PART */}
                {post.image_url && (
                    <img
                        src={post.image_url}
                        alt="Post"
                        className="mt-4 w-full rounded-lg"
                    />
                )}

                {post.video_url && (
                    <iframe
                        src={post.video_url}
                        className="mt-4 h-64 w-full rounded-lg"
                        allowFullScreen
                    />
                )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-slate-900">Comments</h2>

                <form onSubmit={handleCommentSubmit} className="mb-6 space-y-3">
                    <textarea
                        className="min-h-24 w-full rounded-lg border border-slate-300 px-3 py-2"
                        placeholder="Write a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800">
                        Add Comment
                    </button>
                </form>

                <div className="space-y-4">
                    {post.comments?.map((item) => (
                        <div key={item.id} className="rounded-xl border border-slate-200 p-4">
                            <div className="font-medium text-slate-900">{item.user?.name ?? 'Unknown'}</div>
                            <p className="mt-1 text-slate-700">{item.content}</p>

                            <button
                                onClick={() => void handleReply(item.id)}
                                className="mt-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                            >
                                Reply
                            </button>

                            <div className="mt-3 space-y-3 pl-4">
                                {item.replies?.map((reply) => (
                                    <div key={reply.id} className="rounded-lg bg-slate-50 p-3">
                                        <div className="font-medium text-slate-900">{reply.user?.name ?? 'Unknown'}</div>
                                        <p className="mt-1 text-slate-700">{reply.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {post.comments?.length === 0 ? (
                        <p className="text-sm text-slate-500">No comments yet.</p>
                    ) : null}
                </div>
            </div>
        </div>
    )
}