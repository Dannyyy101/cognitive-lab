import React from 'react'
import clsx from 'clsx'

interface LoadingSpinnerProps {
    className?: string
    variant?: 'primary' | 'secondary' | 'danger'
    size?: 'sm' | 'md' | 'lg'
}

const baseStyles = 'loader border-2'

const variantStyles: Record<NonNullable<LoadingSpinnerProps['variant']>, string> = {
    primary: 'border-black',
    secondary: 'border-gray-400',
    danger: 'border-red-700',
}

const sizeStyles: Record<NonNullable<LoadingSpinnerProps['size']>, string> = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-2',
    lg: 'w-16 h-16 border-4',
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className, variant = 'primary', size = 'md' }) => {
    const style = clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)
    return <div className={style}></div>
}
