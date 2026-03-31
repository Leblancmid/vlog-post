import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPosts } from '../api/posts'
import type { Post } from '../types'

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

function formatDate(date?: string) {
    if (!date) return ''
    return new Date(date).toLocaleString()
}

export function HomePage() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const response = await getPosts()
                setPosts(response.data ?? response)
            } finally {
                setLoading(false)
            }
        }

        void loadPosts()
    }, [])

    if (loading) {
        return <div>Loading posts...</div>
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Home</h1>
                <p className="mt-1 text-sm text-slate-500">Latest vlog posts</p>
            </div>

            <div className="space-y-5">
                {posts.map((post) => {
                    const embedVideoUrl = getEmbedVideoUrl(post.video_url)

                    return (
                        <Link
                            key={post.id}
                            to={`/posts/${post.id}`}
                            className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="mb-3">
                                <h2 className="text-lg font-semibold text-slate-900">{post.title}</h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    By {post.user?.name ?? 'Unknown'}
                                    {post.created_at ? ` • ${formatDate(post.created_at)}` : ''}
                                </p>
                            </div>

                            <p className="line-clamp-3 text-slate-700">{post.content}</p>

                            {post.image_url ? (
                                <img
                                    src={post.image_url}
                                    alt="Post preview"
                                    className="mt-4 h-56 w-full rounded-xl object-cover"
                                />
                            ) : null}

                            {!post.image_url && embedVideoUrl ? (
                                <div className="relative mt-4 w-full overflow-hidden rounded-xl bg-slate-100 pt-[56.25%]">
                                    <iframe
                                        src={embedVideoUrl}
                                        className="absolute left-0 top-0 h-full w-full"
                                        title="Video preview"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            ) : null}

                            <div className="mt-4 text-sm font-medium text-slate-600">
                                {post.comments?.length ?? 0} comments
                            </div>
                        </Link>
                    )
                })}

                {posts.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
                        No posts yet. Be the first to create one.
                    </div>
                ) : null}
            </div>
        </div>
    )
}