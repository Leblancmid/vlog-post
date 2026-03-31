import { useState } from 'react'
import { useAuthStore } from '../store/authStore'

export function LoginPage() {
    const login = useAuthStore((state) => state.login)
    const isLoading = useAuthStore((state) => state.isLoading)

    const [isSubmitting, setIsSubmitting] = useState(false)

    const [email, setEmail] = useState('demo@vlogapp.com')
    const [password, setPassword] = useState('password')
    const [error, setError] = useState('')
    const [fieldErrors, setFieldErrors] = useState({
        email: '',
        password: '',
    })

    const validateForm = () => {
        const errors = {
            email: '',
            password: '',
        }

        const emailTrimmed = email.trim()

        if (!emailTrimmed) {
            errors.email = 'Email is required.'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
            errors.email = 'Please enter a valid email address.'
        }

        if (!password.trim()) {
            errors.password = 'Password is required.'
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters.'
        }

        setFieldErrors(errors)

        return !errors.email && !errors.password
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        const trimmedEmail = email.trim()

        if (!trimmedEmail) {
            setError('Email is required.')
            return
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            setError('Please enter a valid email address.')
            return
        }

        if (!password.trim()) {
            setError('Password is required.')
            return
        }

        setIsSubmitting(true)

        try {
            await login(trimmedEmail, password)
        } catch (err: any) {
            if (err?.response?.status === 422) {
                setError('Email or password is incorrect.')
            } else {
                setError('Something went wrong. Please try again.')
            }
        } finally {
            setIsSubmitting(false)
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

                        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className={`w-full rounded-xl border px-4 py-3 outline-none transition ${fieldErrors.email
                                        ? 'border-red-400 focus:border-red-500'
                                        : 'border-slate-300 focus:border-slate-500'
                                        }`}
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        if (fieldErrors.email) {
                                            setFieldErrors((prev) => ({ ...prev, email: '' }))
                                        }
                                    }}
                                    placeholder="Enter your email"
                                />
                                {fieldErrors.email ? (
                                    <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
                                ) : null}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className={`w-full rounded-xl border px-4 py-3 outline-none transition ${fieldErrors.password
                                        ? 'border-red-400 focus:border-red-500'
                                        : 'border-slate-300 focus:border-slate-500'
                                        }`}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        if (fieldErrors.password) {
                                            setFieldErrors((prev) => ({ ...prev, password: '' }))
                                        }
                                    }}
                                    placeholder="Enter your password"
                                />
                                {fieldErrors.password ? (
                                    <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
                                ) : null}
                            </div>

                            {error ? (
                                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                    {error}
                                </div>
                            ) : null}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Signing in...' : 'Login'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}