import { type ReactNode } from 'react'

interface CardWidgetProps {
  title?: string
  subtitle?: string
  children: ReactNode
  elevation?: 'sm' | 'md' | 'lg' | 'xl'
  hoverable?: boolean
  className?: string
  footer?: ReactNode
}

/**
 * Card Widget Component
 * 
 * A flexible card container for displaying content with optional title, subtitle, and footer.
 * Supports different elevation levels and hover effects.
 */
export function CardWidget({
  title,
  subtitle,
  children,
  elevation = 'md',
  hoverable = false,
  className = '',
  footer
}: CardWidgetProps) {
  const baseStyles = 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-200'
  
  const elevationStyles = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  }
  
  const hoverStyles = hoverable ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''
  
  const combinedClassName = [
    baseStyles,
    elevationStyles[elevation],
    hoverStyles,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={combinedClassName}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      <div className="px-6 py-4">
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  )
}