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
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true)

            try {
                const response = await getPosts(page)
                setPosts(response.data)
                setLastPage(response.last_page)
            } finally {
                setLoading(false)
            }
        }

        void loadPosts()
    }, [page])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [page])

    if (loading) {
        return <div>Loading posts...</div>
    }

    return (
        <div>
            <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-900">Latest vlog posts</h1>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                    Browse updates from your vlog feed, open a post to join the discussion,
                    or create a new one from the sidebar.
                </p>
            </div>

            <div className="space-y-5">
                {posts.map((post) => {
                    const embedVideoUrl = getEmbedVideoUrl(post.video_url)

                    return (
                        <Link
                            key={post.id}
                            to={`/posts/${post.id}`}
                            className="block rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
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
                                    className="mt-4 h-48 w-full rounded-2xl object-cover sm:h-56"
                                />
                            ) : null}

                            {!post.image_url && embedVideoUrl ? (
                                <div className="relative mt-4 w-full overflow-hidden rounded-2xl bg-slate-100 pt-[56.25%]">
                                    <iframe
                                        src={embedVideoUrl}
                                        className="absolute left-0 top-0 h-full w-full"
                                        title="Video preview"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            ) : null}

                            <div className="mt-4 flex items-center justify-between text-sm">
                                <span className="font-medium text-slate-600">
                                    {post.comments?.length ?? 0} comments
                                </span>
                                <span className="text-slate-400">Open post →</span>
                            </div>
                        </Link>
                    )
                })}

                {posts.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
                        No posts yet. Be the first to create one.
                    </div>
                ) : null}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 disabled:opacity-50"
                >
                    Previous
                </button>

                <div className="flex flex-wrap items-center justify-center gap-2">
                    {Array.from({ length: lastPage }, (_, index) => {
                        const pageNumber = index + 1

                        return (
                            <button
                                key={pageNumber}
                                onClick={() => setPage(pageNumber)}
                                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${page === pageNumber
                                    ? 'bg-slate-900 text-white'
                                    : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                {pageNumber}
                            </button>
                        )
                    })}
                </div>

                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, lastPage))}
                    disabled={page === lastPage}
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    )
}