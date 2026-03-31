import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../api/posts'

function normalizeVideoUrl(url: string) {
    if (!url.trim()) return undefined

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
                image_url: imageUrl.trim() || undefined,
                video_url: normalizeVideoUrl(videoUrl),
            })

            navigate(`/posts/${post.id}`)
        } catch (error: any) {
            console.error(error)
            console.error(error?.response?.data)
            setError(error?.response?.data?.message || 'Unable to create post.')
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
                        placeholder="Enter post title"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Content</label>
                    <textarea
                        className="min-h-32 w-full rounded-lg border border-slate-300 px-3 py-2"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your vlog post content"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Image URL</label>
                    <input
                        className="w-full rounded-lg border border-slate-300 px-3 py-2"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Video URL</label>
                    <input
                        className="w-full rounded-lg border border-slate-300 px-3 py-2"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="Paste a YouTube watch, share, or embed URL"
                    />
                    <p className="mt-1 text-xs text-slate-500">
                        You can paste a YouTube watch link and it will be converted automatically.
                    </p>
                </div>

                {error ? <p className="text-sm text-red-600">{error}</p> : null}

                <button className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800">
                    Publish Post
                </button>
            </form>
        </div>
    )
}