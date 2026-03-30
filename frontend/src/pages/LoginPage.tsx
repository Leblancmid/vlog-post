import { useState } from 'react'
import { useAuthStore } from '../store/authStore'

export function LoginPage() {
    const login = useAuthStore((state) => state.login)
    const isLoading = useAuthStore((state) => state.isLoading)

    const [email, setEmail] = useState('demo@vlogapp.com')
    const [password, setPassword] = useState('password')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        try {
            await login(email, password)
        } catch {
            setError('Invalid credentials or server error.')
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
                <h1 className="mb-6 text-2xl font-bold text-slate-900">Login</h1>

                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                    <input
                        type="email"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
                    <input
                        type="password"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-800 disabled:opacity-50"
                >
                    {isLoading ? 'Signing in...' : 'Login'}
                </button>
            </form>
        </div>
    )
}