import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPosts } from '../api/posts'
import type { Post } from '../types'

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

            <div className="space-y-4">
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        to={`/posts/${post.id}`}
                        className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                    >
                        <h2 className="mb-2 text-lg font-semibold text-slate-900">{post.title}</h2>
                        <p className="mb-2 text-sm text-slate-500">By {post.user?.name ?? 'Unknown'}</p>
                        <p className="line-clamp-3 text-slate-700">{post.content}</p>
                    </Link>
                ))}

                {posts.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
                        No posts yet.
                    </div>
                ) : null}
            </div>
        </div>
    )
}