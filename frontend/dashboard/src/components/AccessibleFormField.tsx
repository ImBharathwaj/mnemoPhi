import { forwardRef } from 'react'
import { createFormFieldProps, createErrorMessageProps, generateId } from '../utils/accessibility'

interface AccessibleFormFieldProps {
  label: string
  error?: string
  required?: boolean
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  placeholder?: string
  className?: string
  inputClassName?: string
  labelClassName?: string
  errorClassName?: string
  disabled?: boolean
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
  autoComplete?: string
  autoFocus?: boolean
  maxLength?: number
  minLength?: number
  pattern?: string
  title?: string
}

export const AccessibleFormField = forwardRef<HTMLInputElement, AccessibleFormFieldProps>(
  (
    {
      label,
      error,
      required = false,
      type = 'text',
      placeholder,
      className = '',
      inputClassName = '',
      labelClassName = '',
      errorClassName = '',
      disabled = false,
      value,
      onChange,
      onBlur,
      onFocus,
      autoComplete,
      autoFocus = false,
      maxLength,
      minLength,
      pattern,
      title,
    },
    ref
  ) => {
    const fieldId = generateId('field')
    const fieldProps = createFormFieldProps(fieldId, label, error, required)
  
  // Fix aria-invalid type
  const fixedFieldProps = {
    ...fieldProps,
    'aria-invalid': error ? true : false,
  }
    const errorProps = error ? createErrorMessageProps(fieldId, error) : {}

    return (
      <div className={`space-y-1 ${className}`}>
        <label
          htmlFor={fieldId}
          className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-label="required">
              *
            </span>
          )}
        </label>
        
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          title={title}
          className={`input mt-1 ${inputClassName} ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
          }`}
          {...fixedFieldProps}
        />
        
        {error && (
          <div
            className={`text-sm text-red-600 ${errorClassName}`}
            {...errorProps}
          >
            {error}
          </div>
        )}
      </div>
    )
  }
)

AccessibleFormField.displayName = 'AccessibleFormField'