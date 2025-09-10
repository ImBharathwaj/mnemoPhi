import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  return (
    <div 
      className={`flex items-center justify-center p-4 ${className}`} 
      role="status" 
      aria-live="polite"
      aria-label="Loading content"
    >
      <Loader2 
        className={`animate-spin text-primary-600 ${sizeClasses[size]}`} 
        aria-hidden="true"
      />
      <span className="sr-only">Loading content, please wait...</span>
    </div>
  )
}