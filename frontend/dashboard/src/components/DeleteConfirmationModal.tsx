import { AccessibleButton } from './AccessibleButton'
import { AlertTriangle } from 'lucide-react'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  itemName?: string
  isLoading?: boolean
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  itemName,
  isLoading = false
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-4 border shadow-lg rounded-md bg-white" style={{ width: '400px' }}>
        {/* Header */}
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 w-10 h-10 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>
        
        {/* Content */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-2">{message}</p>
          {itemName && (
            <p className="text-sm font-medium text-gray-900 bg-gray-100 px-3 py-2 rounded-md">
              "{itemName}"
            </p>
          )}
          <p className="text-xs text-red-600 mt-2">
            This action cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-3">
          <AccessibleButton
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
            size="sm"
          >
            Cancel
          </AccessibleButton>
          <AccessibleButton
            type="button"
            variant="danger"
            onClick={onConfirm}
            loading={isLoading}
            disabled={isLoading}
            size="sm"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </AccessibleButton>
        </div>
      </div>
    </div>
  )
}