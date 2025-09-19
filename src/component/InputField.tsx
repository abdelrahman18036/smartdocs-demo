import { type InputHTMLAttributes } from 'react'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string | null
  helpText?: string
  fullWidth?: boolean
}

/**
 * Input Field Component
 * 
 * A form input component with label, error handling, and help text support.
 * Includes proper accessibility attributes and styling for different states.
 */
export function InputField({
  label,
  error,
  helpText,
  fullWidth = true,
  className = '',
  id,
  ...props
}: InputFieldProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  
  const baseStyles = 'block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors'
  const errorStyles = error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
  const widthStyles = fullWidth ? 'w-full' : ''
  
  const combinedClassName = [
    baseStyles,
    errorStyles,
    widthStyles,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        id={inputId}
        className={combinedClassName}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined
        }
        {...props}
      />
      
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1 text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}
      
      {helpText && !error && (
        <p
          id={`${inputId}-help`}
          className="mt-1 text-sm text-gray-500 dark:text-gray-400"
        >
          {helpText}
        </p>
      )}
    </div>
  )
}