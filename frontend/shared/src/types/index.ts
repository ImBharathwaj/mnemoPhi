// Analytics types
export * from './analytics';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'admin' | 'manager' | 'user';
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  apiKey: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt?: string;
}

export interface Consent {
  id: string;
  userId: string;
  categoryId: string;
  granted: boolean;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface ConsentCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
  jurisdiction: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Jurisdiction {
  id: string;
  name: string;
  code: string;
  region: string;
  dataProtectionLaw: string;
  effectiveDate: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}