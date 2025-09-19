import { useState, useMemo, useCallback } from 'react'

interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => boolean | string
}

interface ValidationResult {
  isValid: boolean
  errors: string[]
}

/**
 * Custom hook for form validation
 * 
 * @param initialValues - Initial form values
 * @param validationRules - Validation rules for each field
 * @returns Form state and validation utilities
 */
export function useFormValidator<T extends Record<string, string>>(
  initialValues: T,
  validationRules: Partial<Record<keyof T, ValidationRule>>
) {
  const [values, setValues] = useState<T>(initialValues)
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})

  const validateField = useCallback((fieldName: keyof T, value: string): ValidationResult => {
    const rules = validationRules[fieldName]
    if (!rules) return { isValid: true, errors: [] }

    const errors: string[] = []

    if (rules.required && (!value || value.trim() === '')) {
      errors.push(`${String(fieldName)} is required`)
    }

    if (value && rules.minLength && value.length < rules.minLength) {
      errors.push(`${String(fieldName)} must be at least ${rules.minLength} characters`)
    }

    if (value && rules.maxLength && value.length > rules.maxLength) {
      errors.push(`${String(fieldName)} must be no more than ${rules.maxLength} characters`)
    }

    if (value && rules.pattern && !rules.pattern.test(value)) {
      errors.push(`${String(fieldName)} format is invalid`)
    }

    if (value && rules.custom) {
      const customResult = rules.custom(value)
      if (typeof customResult === 'string') {
        errors.push(customResult)
      } else if (!customResult) {
        errors.push(`${String(fieldName)} is invalid`)
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }, [validationRules])

  const validation = useMemo(() => {
    const results: Record<string, ValidationResult> = {}
    let overallValid = true

    for (const field in values) {
      const result = validateField(field, values[field])
      results[field] = result
      if (!result.isValid) {
        overallValid = false
      }
    }

    return {
      fields: results,
      isValid: overallValid
    }
  }, [values, validateField])

  const updateField = (fieldName: keyof T, value: string) => {
    setValues(prev => ({ ...prev, [fieldName]: value }))
  }

  const touchField = (fieldName: keyof T) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }))
  }

  const reset = () => {
    setValues(initialValues)
    setTouched({})
  }

  const getFieldError = (fieldName: keyof T): string | null => {
    if (!touched[fieldName]) return null
    const fieldValidation = validation.fields[fieldName as string]
    return fieldValidation?.errors[0] || null
  }

  return {
    values,
    validation,
    updateField,
    touchField,
    reset,
    getFieldError,
    isValid: validation.isValid
  }
}