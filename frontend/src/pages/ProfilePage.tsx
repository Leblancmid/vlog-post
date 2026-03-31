import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { useAuthStore } from '../store/authStore'
import { updateUser } from '../api/user'

export function ProfilePage() {
    const user = useAuthStore((state) => state.user)
    const setUser = useAuthStore((state) => state.setUser)

    const [isOpen, setIsOpen] = useState(false)

    const [name, setName] = useState(user?.name ?? '')
    const [bio, setBio] = useState(user?.bio ?? '')
    const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url ?? '')
    const [loading, setLoading] = useState(false)

    const openModal = () => {
        setName(user?.name ?? '')
        setBio(user?.bio ?? '')
        setAvatarUrl(user?.avatar_url ?? '')
        setIsOpen(true)
    }

    const closeModal = () => setIsOpen(false)

    const handleSubmit = async () => {
        setLoading(true)

        try {
            const updated = await updateUser({
                name,
                bio,
                avatar_url: avatarUrl,
            })

            setUser(updated)
            closeModal()
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mx-auto max-w-4xl">
            {/* Profile Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-slate-900">Profile</h1>

                    <button
                        onClick={openModal}
                        className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white"
                    >
                        Edit Profile
                    </button>
                </div>

                <div className="mt-6 flex items-center gap-4">
                    <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl bg-slate-900 text-white">
                        {user?.avatar_url ? (
                            <img
                                src={user.avatar_url}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            user?.name?.charAt(0).toUpperCase()
                        )}
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">{user?.name}</h2>
                        <p className="text-sm text-slate-500">{user?.email}</p>
                    </div>
                </div>

                {user?.bio && (
                    <p className="mt-4 text-slate-600">{user.bio}</p>
                )}
            </div>

            {/* Modal */}
            <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
                        <Dialog.Title className="text-lg font-semibold">
                            Edit Profile
                        </Dialog.Title>

                        <div className="mt-4 space-y-4">
                            <input
                                className="w-full rounded-lg border px-3 py-2"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                            />

                            <input
                                className="w-full rounded-lg border px-3 py-2"
                                value={avatarUrl}
                                onChange={(e) => setAvatarUrl(e.target.value)}
                                placeholder="Avatar URL"
                            />

                            <textarea
                                className="w-full rounded-lg border px-3 py-2"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Bio"
                            />
                        </div>

                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                onClick={closeModal}
                                className="rounded-lg border px-4 py-2"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="rounded-lg bg-slate-900 px-4 py-2 text-white"
                            >
                                {loading ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    )
}