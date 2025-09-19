import React from 'react';

/**
 * A dialog modal component for displaying content in an overlay
 * 
 * @example
 * <DialogModal 
 *   isOpen={showModal} 
 *   onClose={() => setShowModal(false)}
 *   title="Confirm Action"
 * >
 *   <p>Are you sure you want to proceed?</p>
 * </DialogModal>
 */
export interface DialogModalProps {
  /** Whether the modal is currently visible */
  isOpen: boolean;
  /** Function called when the modal should be closed */
  onClose: () => void;
  /** Optional title for the modal header */
  title?: string;
  /** The content to display in the modal body */
  children: React.ReactNode;
  /** Maximum width of the modal */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  /** Whether clicking the backdrop should close the modal */
  closeOnBackdropClick?: boolean;
}

/**
 * Dialog modal component for displaying overlay content
 */
export const DialogModal: React.FC<DialogModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'md',
  closeOnBackdropClick = true,
}) => {
  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className={`bg-white rounded-lg shadow-xl w-full mx-4 ${maxWidthClasses[maxWidth]}`}>
        {title && (
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>
        )}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};