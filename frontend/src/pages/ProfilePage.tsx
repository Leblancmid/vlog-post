import { useAuthStore } from '../store/authStore'

export function ProfilePage() {
    const user = useAuthStore((state) => state.user)

    return (
        <div className="mx-auto max-w-4xl">
            <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                    Basic account information for the currently logged-in user.
                </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-900 text-2xl font-bold text-white">
                        {user?.name?.charAt(0).toUpperCase() ?? 'U'}
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

                <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
                    This profile page is intentionally read-only for the assessment.
                </div>
            </div>
        </div>
    )
}