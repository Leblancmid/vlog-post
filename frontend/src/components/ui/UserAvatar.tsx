type UserAvatarProps = {
    name?: string | null
    avatarUrl?: string | null
    size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
    sm: 'h-9 w-9 text-sm rounded-xl',
    md: 'h-12 w-12 text-base rounded-2xl',
    lg: 'h-20 w-20 text-2xl rounded-3xl',
}

function getAvatarSrc(avatarUrl?: string | null) {
    if (!avatarUrl) return null

    if (avatarUrl.startsWith('/storage/')) {
        return `http://127.0.0.1:8000${avatarUrl}`
    }

    return avatarUrl
}

export function UserAvatar({
    name,
    avatarUrl,
    size = 'md',
}: UserAvatarProps) {
    const src = getAvatarSrc(avatarUrl)
    const initial = name?.charAt(0).toUpperCase() ?? 'U'

    return (
        <div
            className={`flex items-center justify-center overflow-hidden bg-slate-900 font-bold text-white ${sizeClasses[size]}`}
        >
            {src ? (
                <img
                    src={src}
                    alt={name ?? 'User avatar'}
                    className="h-full w-full object-cover"
                />
            ) : (
                initial
            )}
        </div>
    )
}