import { useAuthStore } from '../store/authStore'

export function ProfilePage() {
    const user = useAuthStore((state) => state.user)

    return (
        <div className="mx-auto max-w-3xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Basic account information
                </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-xl font-semibold text-slate-700">
                        {user?.name?.charAt(0).toUpperCase() ?? 'U'}
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">
                            {user?.name ?? 'Unknown User'}
                        </h2>
                        <p className="text-sm text-slate-500">{user?.email ?? 'No email'}</p>
                    </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-sm font-medium text-slate-500">Name</p>
                        <p className="mt-1 text-slate-900">{user?.name ?? '-'}</p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-sm font-medium text-slate-500">Email</p>
                        <p className="mt-1 text-slate-900">{user?.email ?? '-'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}