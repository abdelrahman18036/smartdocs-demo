import React from 'react';

/**
 * A flexible card widget component for displaying content with optional header and footer
 * 
 * @example
 * <CardWidget 
 *   title="Product Card" 
 *   subtitle="Best seller"
 *   footer={<Button>Buy Now</Button>}
 * >
 *   <p>This is an amazing product that you should definitely buy!</p>
 * </CardWidget>
 */
export interface CardWidgetProps {
  /** The main content of the card */
  children: React.ReactNode;
  /** Optional title displayed in the card header */
  title?: string;
  /** Optional subtitle displayed below the title */
  subtitle?: string;
  /** Optional footer content (buttons, links, etc.) */
  footer?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Card elevation/shadow level */
  elevation?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Whether the card should be hoverable with animation */
  hoverable?: boolean;
}

/**
 * A versatile card widget component for organizing content
 */
export const CardWidget: React.FC<CardWidgetProps> = ({
  children,
  title,
  subtitle,
  footer,
  className = '',
  elevation = 'md',
  hoverable = false,
}) => {
  const elevationClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const hoverClasses = hoverable 
    ? 'hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200' 
    : '';

  const cardClasses = [
    'bg-white rounded-lg border border-gray-200 overflow-hidden',
    elevationClasses[elevation],
    hoverClasses,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
      )}
      
      <div className="px-6 py-4">
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};