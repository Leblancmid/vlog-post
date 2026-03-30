import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../api/posts'

export function CreatePostPage() {
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        try {
            const post = await createPost({
                title,
                content,
                image_url: imageUrl || undefined,
                video_url: videoUrl || undefined,
            })

            navigate(`/posts/${post.id}`)
        } catch {
            setError('Unable to create post.')
        }
    }

    return (
        <div className="max-w-2xl">
            <h1 className="mb-6 text-2xl font-bold text-slate-900">Create Post</h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
                    <input
                        className="w-full rounded-lg border border-slate-300 px-3 py-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Content</label>
                    <textarea
                        className="min-h-32 w-full rounded-lg border border-slate-300 px-3 py-2"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Image URL</label>
                    <input
                        className="w-full rounded-lg border border-slate-300 px-3 py-2"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Video URL</label>
                    <input
                        className="w-full rounded-lg border border-slate-300 px-3 py-2"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                    />
                </div>

                {error ? <p className="text-sm text-red-600">{error}</p> : null}

                <button className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800">
                    Publish Post
                </button>
            </form>
        </div>
    )
}