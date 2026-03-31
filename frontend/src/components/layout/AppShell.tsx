import { useState, type PropsWithChildren } from 'react'
import { Sidebar } from './Sidebar'

export function AppShell({ children }: PropsWithChildren) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="border-b border-slate-200 bg-white px-4 py-3 md:hidden">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-bold text-slate-900">Vlog App</h1>

                    <button
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
                    >
                        {mobileMenuOpen ? 'Close' : 'Menu'}
                    </button>
                </div>

                {mobileMenuOpen ? (
                    <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
                        <Sidebar onNavigate={() => setMobileMenuOpen(false)} />
                    </div>
                ) : null}
            </div>

            <div className="flex min-h-screen">
                <div className="hidden md:block">
                    <Sidebar />
                </div>

                <main className="flex-1 p-4 md:p-8">{children}</main>
            </div>
        </div>
    )
}