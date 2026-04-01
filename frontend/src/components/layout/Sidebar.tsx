import { Home, PlusSquare, User, LogOut, Video } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

type SidebarProps = {
    onNavigate?: () => void
}

const navItems = [
    { to: '/', label: 'Home', icon: Home, end: true },
    { to: '/create-post', label: 'Create Post', icon: PlusSquare },
    { to: '/profile', label: 'Profile', icon: User },
]

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
        <aside className="sticky top-0 flex h-screen w-72 flex-col border-r border-slate-200 bg-slate-50/80 backdrop-blur">
            <div className="border-b border-slate-200 px-6 py-6">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
                        <Video size={22} />
                    </div>

                    <div>
                        <h1 className="text-lg font-bold text-slate-900">Vlog App</h1>
                        <p className="text-sm text-slate-500">Content Dashboard</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col justify-between px-4 py-6">
                <div>
                    <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Navigation
                    </p>

                    <nav className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon

                            return (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.end}
                                    onClick={handleNavigate}
                                    className={({ isActive }) =>
                                        `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${isActive
                                            ? 'bg-slate-900 text-white shadow-sm'
                                            : 'text-slate-600 hover:bg-white hover:text-slate-900'
                                        }`
                                    }
                                >
                                    <Icon size={18} />
                                    <span>{item.label}</span>
                                </NavLink>
                            )
                        })}
                    </nav>
                </div>

                <div className="space-y-4">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Logged in as
                        </p>

                        <div className="mt-3 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                                {(user?.name?.charAt(0) ?? 'D').toUpperCase()}
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-slate-900">
                                    {user?.name ?? 'Demo User'}
                                </p>
                                <p className="truncate text-xs text-slate-500">
                                    {user?.email ?? 'demo@vlogapp.com'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => void handleLogout()}
                        className="flex w-full items-center gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    )
}