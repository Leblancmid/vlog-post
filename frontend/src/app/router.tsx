import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { CreatePostPage } from '../pages/CreatePostPage'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { PostDetailPage } from '../pages/PostDetailPage'
import { useAuthStore } from '../store/authStore'

function ProtectedLayout() {
    const { isAuthenticated, isLoading } = useAuthStore()

    if (isLoading) {
        return <div className="p-6">Loading...</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return (
        <AppShell>
            <Outlet />
        </AppShell>
    )
}

function GuestLayout() {
    const { isAuthenticated, isLoading } = useAuthStore()

    if (isLoading) {
        return <div className="p-6">Loading...</div>
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return <LoginPage />
}

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <GuestLayout />,
    },
    {
        path: '/',
        element: <ProtectedLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'create-post', element: <CreatePostPage /> },
            { path: 'posts/:id', element: <PostDetailPage /> },
        ],
    },
])