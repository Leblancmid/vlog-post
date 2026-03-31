import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { addComment, replyToComment } from '../api/comments'
import { getPost } from '../api/posts'
import type { Post } from '../types'
import { UserAvatar } from '../components/ui/UserAvatar'

function getEmbedVideoUrl(url?: string | null) {
    if (!url) return null

    if (url.includes('youtube.com/embed/')) {
        return url
    }

    const watchMatch = url.match(/[?&]v=([^&]+)/)
    if (url.includes('youtube.com/watch') && watchMatch) {
        return `https://www.youtube.com/embed/${watchMatch[1]}`
    }

    const shortMatch = url.match(/youtu\.be\/([^?&]+)/)
    if (shortMatch) {
        return `https://www.youtube.com/embed/${shortMatch[1]}`
    }

    return url
}

function getImageUrl(path?: string | null) {
    if (!path) return null

    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path
    }

    const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ?? ''
    return `${baseUrl}${path}`
}

function formatDate(date?: string) {
    if (!date) return ''
    return new Date(date).toLocaleString()
}

export function PostDetailPage() {
    const { id } = useParams()

    const [post, setPost] = useState<Post | null>(null)
    const [comment, setComment] = useState('')
    const [isLoadingPost, setIsLoadingPost] = useState(true)
    const [isSubmittingComment, setIsSubmittingComment] = useState(false)
    const [replyingTo, setReplyingTo] = useState<number | null>(null)
    const [replyContent, setReplyContent] = useState<Record<number, string>>({})
    const [submittingReplyId, setSubmittingReplyId] = useState<number | null>(null)
    const [imageError, setImageError] = useState(false)

    const loadPost = async () => {
        if (!id) {
            setPost(null)
            setIsLoadingPost(false)
            return
        }

        setIsLoadingPost(true)
        setImageError(false)

        try {
            const data = await getPost(id)
            setPost(data)
        } catch (error) {
            console.error('Failed to load post:', error)
            setPost(null)
        } finally {
            setIsLoadingPost(false)
        }
    }

    useEffect(() => {
        void loadPost()
    }, [id])

    const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!id || !comment.trim()) return

        setIsSubmittingComment(true)

        try {
            await addComment(id, { content: comment.trim() })
            setComment('')
            await loadPost()
        } catch (error) {
            console.error('Failed to add comment:', error)
        } finally {
            setIsSubmittingComment(false)
        }
    }

    const handleReplySubmit = async (commentId: number) => {
        const content = replyContent[commentId]?.trim()

        if (!content) return

        setSubmittingReplyId(commentId)

        try {
            await replyToComment(String(commentId), { content })
            setReplyContent((prev) => ({ ...prev, [commentId]: '' }))
            setReplyingTo(null)
            await loadPost()
        } catch (error) {
            console.error('Failed to reply to comment:', error)
        } finally {
            setSubmittingReplyId(null)
        }
    }

    if (isLoadingPost) {
        return <div className="text-slate-500">Loading post...</div>
    }

    if (!post) {
        return <div className="text-slate-500">Post not found.</div>
    }

    const embedVideoUrl = getEmbedVideoUrl(post.video_url)
    const imageUrl = getImageUrl(post.image_url)

    return (
        <div className="max-w-3xl space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="mb-4 text-2xl font-bold text-slate-900">{post.title}</h1>

                <div className="mb-4 flex items-center gap-3">
                    <UserAvatar
                        name={post.user?.name}
                        avatarUrl={post.user?.avatar_url}
                        size="md"
                    />

                    <div>
                        <p className="text-sm font-medium text-slate-900">
                            {post.user?.name ?? 'Unknown'}
                        </p>
                        <p className="text-sm text-slate-500">
                            {post.created_at ? formatDate(post.created_at) : ''}
                        </p>
                    </div>
                </div>

                <p className="whitespace-pre-line text-slate-700">{post.content}</p>

                {imageUrl && !imageError && (
                    <img
                        src={imageUrl}
                        alt="Post"
                        onError={() => setImageError(true)}
                        className="mt-4 max-h-[500px] w-full rounded-lg object-cover"
                    />
                )}

                {!imageUrl && embedVideoUrl && (
                    <div className="mt-4">
                        <div className="relative w-full overflow-hidden rounded-lg pt-[56.25%]">
                            <iframe
                                src={embedVideoUrl}
                                className="absolute left-0 top-0 h-full w-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded video"
                            />
                        </div>

                        <a
                            href={post.video_url ?? embedVideoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 block text-sm text-blue-600 hover:underline"
                        >
                            Open video in new tab
                        </a>
                    </div>
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
                        disabled={isSubmittingComment}
                    />

                    <button
                        type="submit"
                        disabled={isSubmittingComment || !comment.trim()}
                        className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSubmittingComment ? 'Posting...' : 'Add Comment'}
                    </button>
                </form>

                <div className="space-y-4">
                    {post.comments?.map((item) => (
                        <div key={item.id} className="rounded-xl border border-slate-200 p-4">
                            <div className="flex items-start gap-3">
                                <UserAvatar
                                    name={item.user?.name}
                                    avatarUrl={item.user?.avatar_url}
                                    size="sm"
                                />

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <div className="font-medium text-slate-900">
                                            {item.user?.name ?? 'Unknown'}
                                        </div>
                                        {item.created_at ? (
                                            <div className="text-xs text-slate-500">
                                                {formatDate(item.created_at)}
                                            </div>
                                        ) : null}
                                    </div>

                                    <p className="mt-2 text-slate-700">{item.content}</p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setReplyingTo(replyingTo === item.id ? null : item.id)}
                                className="mt-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                            >
                                {replyingTo === item.id ? 'Cancel' : 'Reply'}
                            </button>

                            {replyingTo === item.id && (
                                <div className="mt-3 space-y-2">
                                    <textarea
                                        className="min-h-20 w-full rounded-lg border border-slate-300 px-3 py-2"
                                        placeholder="Write a reply..."
                                        value={replyContent[item.id] ?? ''}
                                        onChange={(e) =>
                                            setReplyContent((prev) => ({
                                                ...prev,
                                                [item.id]: e.target.value,
                                            }))
                                        }
                                        disabled={submittingReplyId === item.id}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => void handleReplySubmit(item.id)}
                                        disabled={
                                            submittingReplyId === item.id ||
                                            !(replyContent[item.id] ?? '').trim()
                                        }
                                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {submittingReplyId === item.id ? 'Replying...' : 'Submit Reply'}
                                    </button>
                                </div>
                            )}

                            {item.replies && item.replies.length > 0 && (
                                <div className="mt-4 space-y-3 border-l-2 border-slate-200 pl-3 sm:pl-4">
                                    {item.replies.map((reply) => (
                                        <div key={reply.id} className="rounded-lg bg-slate-50 p-3">
                                            <div className="flex items-center gap-3">
                                                <UserAvatar
                                                    name={reply.user?.name}
                                                    avatarUrl={reply.user?.avatar_url}
                                                    size="sm"
                                                />

                                                <div>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <div className="font-medium text-slate-900">
                                                            {reply.user?.name ?? 'Unknown'}
                                                        </div>
                                                        {reply.created_at ? (
                                                            <div className="text-xs text-slate-500">
                                                                {formatDate(reply.created_at)}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="mt-2 text-slate-700">{reply.content}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
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