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
        <div className="min-h-screen bg-slate-100">
            <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-4 py-8 lg:grid-cols-2">
                <div className="hidden lg:block">
                    <div className="max-w-xl">
                        <div className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                            Vlog Post Web Application
                        </div>

                        <h1 className="text-4xl font-bold leading-tight text-slate-900">
                            Share stories, updates, and moments in one clean space.
                        </h1>

                        <p className="mt-4 text-base leading-7 text-slate-600">
                            Create vlog-style posts with text, images, or video links. Join discussions
                            through comments and threaded replies in a clean, responsive interface.
                        </p>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <p className="text-sm font-medium text-slate-500">Built with</p>
                                <p className="mt-2 text-lg font-semibold text-slate-900">
                                    React + TypeScript
                                </p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <p className="text-sm font-medium text-slate-500">Backend</p>
                                <p className="mt-2 text-lg font-semibold text-slate-900">
                                    Laravel + Sanctum
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto w-full max-w-md">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                        <div className="mb-6 text-center">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white">
                                V
                            </div>

                            <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
                            <p className="mt-2 text-sm text-slate-500">
                                Sign in to continue to your vlog dashboard.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                />
                            </div>

                            {error ? (
                                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                    {error}
                                </div>
                            ) : null}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full rounded-xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
                            >
                                {isLoading ? 'Signing in...' : 'Login'}
                            </button>
                        </form>

                        {/* <div className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                            <p className="font-medium text-slate-800">Demo Credentials</p>
                            <p className="mt-1">Email: demo@vlogapp.com</p>
                            <p>Password: password</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}