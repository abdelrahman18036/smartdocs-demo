import React from 'react';
import { useFormValidator } from '../utils/useFormValidator';

/**
 * A flexible input component with validation support
 * 
 * @example
 * <InputField
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChange={setEmail}
 * />
 */
export interface InputFieldProps {
  /** The input label */
  label?: string;
  /** The input type */
  type?: 'text' | 'email' | 'password' | 'number';
  /** Placeholder text */
  placeholder?: string;
  /** Current input value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Whether the input is required */
  required?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Enhanced input field component with validation
 */
export const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  className = '',
}) => {
  // Example usage of the useFormValidator hook
  const { validateField, errors } = useFormValidator({
    input: (val: string) => {
      if (required && !val.trim()) return 'This field is required';
      if (type === 'email' && val && !/\S+@\S+\.\S+/.test(val)) return 'Invalid email format';
      return null;
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    validateField('input', newValue);
  };

  const hasError = errors.input;

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${hasError ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
      />
      {hasError && (
        <p className="text-sm text-red-600">{hasError}</p>
      )}
    </div>
  );
};