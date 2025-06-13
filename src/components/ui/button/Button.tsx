'use client'
import React from 'react'
import clsx from 'clsx'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

type ButtonProps = {
    className?: string
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    onClick?: () => Promise<void> | void
}

const baseStyles =
    'w-fit h-fit relative inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
}

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    onClick,
    className,
}) => {
    const [loading, setLoading] = React.useState(false)

    const handleOnClick = async () => {
        if (loading || disabled) return
        setLoading(true)
        try {
            await onClick?.()
        } catch (error) {
            console.error('Error in onClick handler:', error)
        } finally {
            setLoading(false)
        }
    }

    const combinedClass = clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)

    return (
        <button className={combinedClass} onClick={handleOnClick} disabled={disabled || loading} aria-busy={loading}>
            {loading && <LoadingSpinner className="absolute" variant={variant} size="sm" />}
            <span className={clsx(loading && 'opacity-0')}>{children}</span>
        </button>
    )
}
