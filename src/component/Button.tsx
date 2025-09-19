import React from 'react';

/**
 * A customizable button component with multiple variants
 * 
 * @example
 * <Button variant="primary" size="large" onClick={() => alert('Clicked!')}>
 *   Click me!
 * </Button>
 */
export interface ButtonProps {
  /** The content to display inside the button */
  children: React.ReactNode;
  /** The visual style variant of the button */
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  /** The size of the button */
  size?: 'small' | 'medium' | 'large';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Click handler function */
  onClick?: () => void;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Button component for user interactions
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  className = '',
}) => {
  const baseClasses = 'rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500',
  };

  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const buttonClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabledClasses,
    className,
  ].join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};