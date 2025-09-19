import { useState, useCallback } from 'react';

/**
 * Custom hook for managing form validation state
 * 
 * @param validationRules - Object containing validation rules for each field
 * @returns Object with validation functions and error state
 * 
 * @example
 * const { validateField, errors, isValid } = useFormValidator({
 *   email: (value) => /\S+@\S+\.\S+/.test(value) ? null : 'Invalid email',
 *   password: (value) => value.length >= 8 ? null : 'Password too short'
 * });
 */
export function useFormValidator<T extends Record<string, any>>(
  validationRules: { [K in keyof T]: (value: T[K]) => string | null }
) {
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validateField = useCallback((fieldName: keyof T, value: T[typeof fieldName]) => {
    const rule = validationRules[fieldName];
    const error = rule ? rule(value) : null;
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
    
    return error === null;
  }, [validationRules]);

  const validateAll = useCallback((values: T) => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    for (const [fieldName, value] of Object.entries(values)) {
      const rule = validationRules[fieldName as keyof T];
      const error = rule ? rule(value) : null;
      if (error) {
        newErrors[fieldName as keyof T] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  }, [validationRules]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const isValid = Object.keys(errors).length === 0;

  return {
    validateField,
    validateAll,
    clearErrors,
    errors,
    isValid
  };
}