import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

type SidebarProps = {
    onNavigate?: () => void
}

export function Sidebar({ onNavigate }: SidebarProps) {
    const navigate = useNavigate()
    const logout = useAuthStore((state) => state.logout)
    const user = useAuthStore((state) => state.user)

    const handleNavigate = () => {
        onNavigate?.()
    }

    const handleLogout = async () => {
        await logout()
        onNavigate?.()
        navigate('/login')
    }

    return (
        <aside className="min-h-screen w-64 border-r border-slate-200 bg-white">
            <div className="border-b border-slate-200 p-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-base font-bold text-white">
                        V
                    </div>

                    <div>
                        <h1 className="text-base font-bold text-slate-900">Vlog App</h1>
                        <p className="text-xs text-slate-500">Content Dashboard</p>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Navigation
                </p>

                <nav className="space-y-2">
                    <NavLink
                        to="/"
                        end
                        onClick={handleNavigate}
                        className={({ isActive }) =>
                            `block rounded-xl px-4 py-3 text-sm font-medium transition ${isActive
                                ? 'bg-slate-900 text-white'
                                : 'text-slate-700 hover:bg-slate-100'
                            }`
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/create-post"
                        onClick={handleNavigate}
                        className={({ isActive }) =>
                            `block rounded-xl px-4 py-3 text-sm font-medium transition ${isActive
                                ? 'bg-slate-900 text-white'
                                : 'text-slate-700 hover:bg-slate-100'
                            }`
                        }
                    >
                        Create Post
                    </NavLink>

                    <NavLink
                        to="/profile"
                        onClick={handleNavigate}
                        className={({ isActive }) =>
                            `block rounded-xl px-4 py-3 text-sm font-medium transition ${isActive
                                ? 'bg-slate-900 text-white'
                                : 'text-slate-700 hover:bg-slate-100'
                            }`
                        }
                    >
                        Profile
                    </NavLink>
                </nav>

                <div className="mt-8 rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Logged in as
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                        {user?.name ?? 'Demo User'}
                    </p>
                    <p className="text-xs text-slate-500">{user?.email ?? 'demo@vlogapp.com'}</p>
                </div>

                <button
                    onClick={() => void handleLogout()}
                    className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                    Logout
                </button>
            </div>
        </aside>
    )
}