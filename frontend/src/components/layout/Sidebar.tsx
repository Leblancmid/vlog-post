import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export function Sidebar() {
    const navigate = useNavigate()
    const logout = useAuthStore((state) => state.logout)

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    return (
        <aside className="hidden min-h-screen w-64 border-r border-slate-200 bg-white md:block">
            <div className="p-6">
                <h1 className="text-xl font-bold text-slate-900">Vlog App</h1>
            </div>

            <nav className="space-y-2 px-4">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `block rounded-lg px-4 py-2 text-sm font-medium ${isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                        }`
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/create-post"
                    className={({ isActive }) =>
                        `block rounded-lg px-4 py-2 text-sm font-medium ${isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                        }`
                    }
                >
                    Create Post
                </NavLink>
            </nav>

            <div className="px-4 pt-6">
                <button
                    onClick={() => void handleLogout()}
                    className="w-full rounded-lg bg-slate-200 px-4 py-2 text-left text-sm font-medium text-slate-800 hover:bg-slate-300"
                >
                    Logout
                </button>
            </div>
        </aside>
    )
}