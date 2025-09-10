// Types
export * from './types';

// API
export { apiClient } from './lib/api-client';
export * from './lib/api-services';

// Stores
export { useAuthStore } from './lib/stores/auth-store';
export { useConsentStore } from './lib/stores/consent-store';
export { useUIStore } from './lib/stores/ui-store';
export { useAnalyticsStore } from './lib/stores/analytics-store';

// Analytics Components
export { ConsentTrendChart } from './components/analytics/ConsentTrendChart';
export { ConsentCategoryChart } from './components/analytics/ConsentCategoryChart';
export { ComplianceMetricsComponent } from './components/analytics/ComplianceMetrics';
export { GeographicDistribution } from './components/analytics/GeographicDistribution';
export { ReportBuilder } from './components/analytics/ReportBuilder';

// Styles
import './index.css';