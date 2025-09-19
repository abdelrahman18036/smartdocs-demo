import React from 'react';
import { useAppStorage } from '../utils/useAppStorage';
import { useApiCall } from '../services/useApiCall';

/**
 * A customizable button component with multiple variants and state management
 * 
 * @example
 * <ButtonComponent variant="primary" size="large" onClick={() => alert('Clicked!')}>
 *   Click me!
 * </ButtonComponent>
 */
export interface ButtonComponentProps {
  /** The content to display inside the button */
  children: React.ReactNode;
  /** The visual style variant of the button */
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
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
 * Advanced button component with state management for user interactions
 */
export const ButtonComponent: React.FC<ButtonComponentProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  className = '',
}) => {
  // Use the new hooks for demonstration
  const [clickCount, setClickCount] = useAppStorage('button-clicks', 0);
  const { data: buttonData } = useApiCall('/api/button-config');

  const baseClasses = 'rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
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

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    onClick?.();
  };

  return (
    <button
      className={buttonClasses}
      onClick={disabled ? undefined : handleClick}
      disabled={disabled}
      title={`Clicked ${clickCount} times`}
    >
      {children}
    </button>
  );
};