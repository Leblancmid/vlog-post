import type { PropsWithChildren } from 'react'
import { Sidebar } from './Sidebar'

export function AppShell({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="flex min-h-screen">
                <Sidebar />

                <main className="flex-1 p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}