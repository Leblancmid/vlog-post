import { useState } from 'react'
import { updateUser } from '../api/user'
import { useAuthStore } from '../store/authStore'

export function ProfilePage() {
    const user = useAuthStore((state) => state.user)
    const setUser = useAuthStore((state) => state.setUser)

    const [name, setName] = useState(user?.name ?? '')
    const [bio, setBio] = useState(user?.bio ?? '')
    const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url ?? '')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSuccessMessage('')
        setErrorMessage('')

        try {
            const updatedUser = await updateUser({
                name: name.trim(),
                bio: bio.trim() || '',
                avatar_url: avatarUrl.trim() || '',
            })

            setUser(updatedUser)
            setSuccessMessage('Profile updated successfully.')
        } catch (error: any) {
            setErrorMessage(error?.response?.data?.message || 'Failed to update profile.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="mx-auto max-w-4xl">
            <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-900">Edit Profile</h1>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                    Update your basic profile information.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl bg-slate-900 text-2xl font-bold text-white">
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt="Avatar preview"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            user?.name?.charAt(0).toUpperCase() ?? 'U'
                        )}
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900">
                            {name || 'Unknown User'}
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            {user?.email ?? 'No email available'}
                        </p>
                    </div>
                </div>

                <div className="mt-8 grid gap-5">
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Full Name
                        </label>
                        <input
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Avatar URL
                        </label>
                        <input
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                            value={avatarUrl}
                            onChange={(e) => setAvatarUrl(e.target.value)}
                            placeholder="https://example.com/avatar.jpg"
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Bio
                        </label>
                        <textarea
                            className="min-h-32 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Write a short bio..."
                        />
                    </div>
                </div>

                {successMessage ? (
                    <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                        {successMessage}
                    </div>
                ) : null}

                {errorMessage ? (
                    <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {errorMessage}
                    </div>
                ) : null}

                <div className="mt-6 flex justify-end">
                    <button
                        disabled={isSubmitting}
                        className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    )
}