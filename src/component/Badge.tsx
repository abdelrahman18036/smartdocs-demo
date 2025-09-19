import type { ReactNode } from 'react'

export interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'small' | 'medium' | 'large'
  className?: string
}

/**
 * Badge Component
 * 
 * A versatile badge component for displaying labels, status indicators, and tags.
 * Supports multiple variants and sizes with customizable styling.
 */
export function Badge({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  className = '' 
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-colors duration-200'
  
  const variantClasses = {
    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    info: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200'
  }
  
  const sizeClasses = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-1.5 text-base'
  }
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ')
  
  return (
    <span className={classes}>
      {children}
    </span>
  )
}
