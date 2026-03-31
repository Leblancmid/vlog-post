import { useEffect, useMemo, useState } from 'react'
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

function getEmbedVideoUrl(url?: string) {
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

    return null
}

export function CreatePostPage() {
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [videoUrl, setVideoUrl] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const normalizedVideoUrl = normalizeVideoUrl(videoUrl)
    const previewVideoUrl = getEmbedVideoUrl(normalizedVideoUrl)

    const imagePreviewUrl = useMemo(() => {
        if (!imageFile) return ''
        return URL.createObjectURL(imageFile)
    }, [imageFile])

    useEffect(() => {
        return () => {
            if (imagePreviewUrl) {
                URL.revokeObjectURL(imagePreviewUrl)
            }
        }
    }, [imagePreviewUrl])

    const hasPreview = Boolean(imagePreviewUrl || previewVideoUrl)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null

        if (!file) {
            setImageFile(null)
            return
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

        if (!allowedTypes.includes(file.type)) {
            setError('Please upload a JPG, PNG, WEBP, or GIF image.')
            e.target.value = ''
            setImageFile(null)
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('Image must be 5MB or smaller.')
            e.target.value = ''
            setImageFile(null)
            return
        }

        setError('')
        setImageFile(file)
    }

    const removeImage = () => {
        setImageFile(null)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setIsSubmitting(true)

        try {
            const formData = new FormData()
            formData.append('title', title.trim())
            formData.append('content', content.trim())

            if (normalizedVideoUrl) {
                formData.append('video_url', normalizedVideoUrl)
            }

            if (imageFile) {
                formData.append('image', imageFile)
            }

            const post = await createPost(formData)
            navigate(`/posts/${post.id}`)
        } catch (error: any) {
            console.error(error)
            console.error(error?.response?.data)
            setError(error?.response?.data?.message || 'Unable to create post.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="mx-auto max-w-6xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Create Post</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Share a vlog update with text, an image, or a video link.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                    <div className="space-y-5">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Title
                            </label>
                            <input
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Give your vlog post a title"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Content
                            </label>
                            <textarea
                                className="min-h-40 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                                name="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write what this vlog post is about..."
                            />
                            <p className="mt-1 text-xs text-slate-500">
                                Tip: a short intro plus context usually looks better in the feed.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Upload Image
                                </label>

                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png,.webp,.gif,image/jpeg,image/png,image/webp,image/gif"
                                    onChange={handleImageChange}
                                    className="block w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition file:mr-3 file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-white hover:file:bg-slate-800"
                                />

                                <p className="mt-1 text-xs text-slate-500">
                                    JPG, PNG, WEBP, or other image files.
                                </p>

                                {imageFile ? (
                                    <div className="mt-2 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
                                        <span className="truncate">{imageFile.name}</span>
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="ml-3 text-red-600 hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : null}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Video URL
                                </label>
                                <input
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                                    value={videoUrl}
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                    placeholder="YouTube watch, share, or embed URL"
                                />
                                <p className="mt-1 text-xs text-slate-500">
                                    YouTube links are converted to embed format automatically.
                                </p>
                            </div>
                        </div>

                        {error ? (
                            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </div>
                        ) : null}

                        <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-slate-500">
                                Your post will appear in the feed after publishing.
                            </p>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => navigate('/')}
                                    className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    disabled={isSubmitting}
                                    className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Publishing...' : 'Publish Post'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-900">Preview</h2>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                            Live
                        </span>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-3">
                            <h3 className="text-lg font-semibold text-slate-900">
                                {title.trim() || 'Your post title'}
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">By You • Just now</p>
                        </div>

                        <p className="whitespace-pre-line text-sm leading-6 text-slate-700">
                            {content.trim() || 'Your post content preview will appear here.'}
                        </p>

                        {imagePreviewUrl ? (
                            <img
                                src={imagePreviewUrl}
                                alt="Preview"
                                className="mt-4 h-56 w-full rounded-xl object-cover"
                            />
                        ) : null}

                        {!imagePreviewUrl && previewVideoUrl ? (
                            <div className="relative mt-4 w-full overflow-hidden rounded-xl bg-slate-200 pt-[56.25%]">
                                <iframe
                                    src={previewVideoUrl}
                                    className="absolute left-0 top-0 h-full w-full"
                                    title="Video preview"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        ) : null}

                        {!hasPreview ? (
                            <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-6 text-center text-sm text-slate-500">
                                Upload an image or add a video link to preview media here.
                            </div>
                        ) : null}
                    </div>

                    <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                        <p className="font-medium text-slate-800">Publishing tips</p>
                        <ul className="mt-2 space-y-1">
                            <li>Use a short, clear title</li>
                            <li>Keep content readable and direct</li>
                            <li>Use clean, high-quality images</li>
                            <li>Use embeddable video links when possible</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}