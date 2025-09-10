/**
 * Accessibility utility functions for WCAG 2.1 AA compliance
 */

/**
 * Generates a unique ID for form elements
 */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Creates proper ARIA attributes for form fields
 */
export function createFormFieldProps(
  id: string,
  label: string,
  error?: string,
  required: boolean = false
) {
  return {
    id,
    'aria-label': label,
    'aria-required': required,
    'aria-invalid': error ? 'true' : 'false',
    'aria-describedby': error ? `${id}-error` : undefined,
  }
}

/**
 * Creates proper ARIA attributes for error messages
 */
export function createErrorMessageProps(fieldId: string, _error: string) {
  return {
    id: `${fieldId}-error`,
    role: 'alert',
    'aria-live': 'polite',
    'aria-atomic': 'true',
  }
}

/**
 * Creates proper ARIA attributes for tab panels
 */
export function createTabPanelProps(tabId: string, panelId: string, isActive: boolean) {
  return {
    id: panelId,
    role: 'tabpanel',
    'aria-labelledby': tabId,
    'aria-hidden': !isActive,
    tabIndex: isActive ? 0 : -1,
  }
}

/**
 * Creates proper ARIA attributes for tabs
 */
export function createTabProps(tabId: string, panelId: string, isActive: boolean) {
  return {
    id: tabId,
    role: 'tab',
    'aria-controls': panelId,
    'aria-selected': isActive,
    'aria-expanded': isActive,
    tabIndex: isActive ? 0 : -1,
  }
}

/**
 * Creates proper ARIA attributes for buttons
 */
export function createButtonProps(
  label: string,
  _variant: 'primary' | 'secondary' | 'danger' = 'primary',
  disabled: boolean = false
) {
  return {
    'aria-label': label,
    'aria-disabled': disabled,
  }
}

/**
 * Creates proper ARIA attributes for navigation
 */
export function createNavigationProps(label: string, current?: boolean) {
  return {
    role: 'navigation',
    'aria-label': label,
    'aria-current': current ? 'page' : undefined,
  }
}

/**
 * Creates proper ARIA attributes for tables
 */
export function createTableProps(caption: string) {
  return {
    role: 'table',
    'aria-label': caption,
  }
}

/**
 * Creates proper ARIA attributes for table headers
 */
export function createTableHeaderProps(columnName: string, sortable: boolean = false) {
  return {
    role: 'columnheader',
    'aria-sort': sortable ? 'none' : undefined,
    'aria-label': sortable ? `${columnName}, sortable` : columnName,
  }
}

/**
 * Creates proper ARIA attributes for modals
 */
export function createModalProps(_title: string, description?: string) {
  return {
    role: 'dialog',
    'aria-modal': 'true',
    'aria-labelledby': 'modal-title',
    'aria-describedby': description ? 'modal-description' : undefined,
  }
}

/**
 * Creates proper ARIA attributes for dropdowns
 */
export function createDropdownProps(
  label: string,
  expanded: boolean,
  hasPopup: boolean = true
) {
  return {
    role: 'button',
    'aria-label': label,
    'aria-expanded': expanded,
    'aria-haspopup': hasPopup,
  }
}

/**
 * Creates proper ARIA attributes for progress indicators
 */
export function createProgressProps(current: number, max: number, label: string) {
  return {
    role: 'progressbar',
    'aria-valuenow': current,
    'aria-valuemin': 0,
    'aria-valuemax': max,
    'aria-label': label,
  }
}

/**
 * Creates proper ARIA attributes for status messages
 */
export function createStatusProps(type: 'success' | 'error' | 'warning' | 'info') {
  const roleMap = {
    success: 'status',
    error: 'alert',
    warning: 'status',
    info: 'status',
  }

  return {
    role: roleMap[type],
    'aria-live': type === 'error' ? 'assertive' : 'polite',
    'aria-atomic': 'true',
  }
}

/**
 * Creates proper ARIA attributes for search
 */
export function createSearchProps(label: string, resultsCount?: number) {
  return {
    role: 'search',
    'aria-label': label,
    'aria-describedby': resultsCount !== undefined ? 'search-results-count' : undefined,
  }
}

/**
 * Creates proper ARIA attributes for breadcrumbs
 */
export function createBreadcrumbProps() {
  return {
    role: 'navigation',
    'aria-label': 'Breadcrumb',
  }
}

/**
 * Creates proper ARIA attributes for breadcrumb items
 */
export function createBreadcrumbItemProps(isLast: boolean) {
  return {
    'aria-current': isLast ? 'page' : undefined,
  }
}

/**
 * Creates proper ARIA attributes for tooltips
 */
export function createTooltipProps(tooltipId: string, _triggerId: string) {
  return {
    id: tooltipId,
    role: 'tooltip',
    'aria-hidden': 'true',
  }
}

/**
 * Creates proper ARIA attributes for tooltip triggers
 */
export function createTooltipTriggerProps(tooltipId: string, triggerId: string) {
  return {
    id: triggerId,
    'aria-describedby': tooltipId,
    'aria-expanded': 'false',
  }
}