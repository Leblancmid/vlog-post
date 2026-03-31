import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useAuthStore } from '../store/authStore'
import { updateUser } from '../api/user'

export function ProfilePage() {
    const user = useAuthStore((state) => state.user)
    const setUser = useAuthStore((state) => state.setUser)

    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState(user?.name ?? '')
    const [bio, setBio] = useState(user?.bio ?? '')
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar_url ?? '')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const openModal = () => {
        setName(user?.name ?? '')
        setBio(user?.bio ?? '')
        setAvatarFile(null)
        setAvatarPreview(user?.avatar_url ?? '')
        setError('')
        setIsOpen(true)
    }

    const closeModal = () => {
        if (loading) return
        setIsOpen(false)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null
        setAvatarFile(file)

        if (file) {
            const previewUrl = URL.createObjectURL(file)
            setAvatarPreview(previewUrl)
        }
    }

    const handleSubmit = async () => {
        setError('')

        if (!name.trim()) {
            setError('Name is required.')
            return
        }

        setLoading(true)

        try {
            const updated = await updateUser({
                name: name.trim(),
                bio: bio.trim(),
                avatar: avatarFile,
            })

            setUser(updated)
            setIsOpen(false)
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Failed to update profile.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mx-auto max-w-4xl">
            <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                    View and manage your account details.
                </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl bg-slate-900 text-2xl font-bold text-white">
                            {user?.avatar_url ? (
                                <img
                                    src={`http://127.0.0.1:8000${user.avatar_url}`}
                                    alt="Avatar"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                user?.name?.charAt(0).toUpperCase() ?? 'U'
                            )}
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-slate-900">
                                {user?.name ?? 'Unknown User'}
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                {user?.email ?? 'No email available'}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={openModal}
                        className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                        Edit Profile
                    </button>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-5">
                        <p className="text-sm font-medium text-slate-500">Full Name</p>
                        <p className="mt-2 text-base font-semibold text-slate-900">
                            {user?.name ?? '-'}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-5">
                        <p className="text-sm font-medium text-slate-500">Email Address</p>
                        <p className="mt-2 text-base font-semibold text-slate-900">
                            {user?.email ?? '-'}
                        </p>
                    </div>
                </div>

                <div className="mt-4 rounded-2xl bg-slate-50 p-5">
                    <p className="text-sm font-medium text-slate-500">Bio</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                        {user?.bio?.trim() || 'No bio added yet.'}
                    </p>
                </div>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto p-4">
                        <div className="flex min-h-full items-center justify-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-200"
                                enterFrom="opacity-0 scale-95 translate-y-2"
                                enterTo="opacity-100 scale-100 translate-y-0"
                                leave="ease-in duration-150"
                                leaveFrom="opacity-100 scale-100 translate-y-0"
                                leaveTo="opacity-0 scale-95 translate-y-2"
                            >
                                <Dialog.Panel className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <Dialog.Title className="text-xl font-semibold text-slate-900">
                                                Edit Profile
                                            </Dialog.Title>
                                            <p className="mt-1 text-sm text-slate-500">
                                                Update your name, avatar, and bio.
                                            </p>
                                        </div>

                                        <button
                                            onClick={closeModal}
                                            className="rounded-lg px-3 py-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    <div className="mt-6 flex items-center gap-4">
                                        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl bg-slate-900 text-2xl font-bold text-white">
                                            {avatarPreview ? (
                                                <img
                                                    src={avatarPreview.startsWith('/storage/')
                                                        ? `http://127.0.0.1:8000${avatarPreview}`
                                                        : avatarPreview}
                                                    alt="Avatar preview"
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                name?.charAt(0).toUpperCase() || 'U'
                                            )}
                                        </div>

                                        <div>
                                            <p className="text-base font-semibold text-slate-900">
                                                {name.trim() || 'Your Name'}
                                            </p>
                                            <p className="text-sm text-slate-500">Live preview</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-5">
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
                                                Upload Avatar
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="block w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                                Bio
                                            </label>
                                            <textarea
                                                className="min-h-28 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                                                value={bio}
                                                onChange={(e) => setBio(e.target.value)}
                                                placeholder="Write a short bio..."
                                            />
                                        </div>
                                    </div>

                                    {error ? (
                                        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                            {error}
                                        </div>
                                    ) : null}

                                    <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                        <button
                                            onClick={closeModal}
                                            disabled={loading}
                                            className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            onClick={() => void handleSubmit()}
                                            disabled={loading}
                                            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
                                        >
                                            {loading ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}