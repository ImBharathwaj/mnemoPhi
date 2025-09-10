import { apiClient } from './api-client';
import { User, Client, Consent, ConsentCategory, Jurisdiction, PaginatedResponse, LoginRequest, RegisterRequest, AuthResponse } from '@/types';

// Auth Services
export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    return response.data!;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data!;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  refreshToken: async (): Promise<{ token: string }> => {
    const response = await apiClient.post<{ token: string }>('/auth/refresh');
    return response.data!;
  },

  forgotPassword: async (email: string): Promise<void> => {
    await apiClient.post('/auth/forgot-password', { email });
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    await apiClient.post('/auth/reset-password', { token, password });
  },
};

// User Services
export const userService = {
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<User>('/users/profile');
    return response.data!;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await apiClient.put<User>('/users/profile', data);
    return response.data!;
  },

  deleteAccount: async (): Promise<void> => {
    await apiClient.delete('/users/profile');
  },

  getUsers: async (page = 1, limit = 10): Promise<PaginatedResponse<User>> => {
    const response = await apiClient.get<PaginatedResponse<User>>(`/users?page=${page}&limit=${limit}`);
    return response.data!;
  },
};

// Client Services
export const clientService = {
  getClients: async (page = 1, limit = 10): Promise<PaginatedResponse<Client>> => {
    const response = await apiClient.get<PaginatedResponse<Client>>(`/clients?page=${page}&limit=${limit}`);
    return response.data!;
  },

  getClient: async (id: string): Promise<Client> => {
    const response = await apiClient.get<Client>(`/clients/${id}`);
    return response.data!;
  },

  createClient: async (data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> => {
    const response = await apiClient.post<Client>('/clients', data);
    return response.data!;
  },

  updateClient: async (id: string, data: Partial<Client>): Promise<Client> => {
    const response = await apiClient.put<Client>(`/clients/${id}`, data);
    return response.data!;
  },

  deleteClient: async (id: string): Promise<void> => {
    await apiClient.delete(`/clients/${id}`);
  },
};

// Consent Services
export const consentService = {
  getConsents: async (page = 1, limit = 10): Promise<PaginatedResponse<Consent>> => {
    const response = await apiClient.get<PaginatedResponse<Consent>>(`/consents?page=${page}&limit=${limit}`);
    return response.data!;
  },

  getUserConsents: async (userId: string): Promise<Consent[]> => {
    const response = await apiClient.get<Consent[]>(`/consents/user/${userId}`);
    return response.data!;
  },

  updateConsent: async (consentId: string, granted: boolean): Promise<Consent> => {
    const response = await apiClient.patch<Consent>(`/consents/${consentId}`, { granted });
    return response.data!;
  },

  getCategories: async (): Promise<ConsentCategory[]> => {
    const response = await apiClient.get<ConsentCategory[]>('/consent-categories');
    return response.data!;
  },

  createCategory: async (data: Omit<ConsentCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<ConsentCategory> => {
    const response = await apiClient.post<ConsentCategory>('/consent-categories', data);
    return response.data!;
  },

  updateCategory: async (id: string, data: Partial<ConsentCategory>): Promise<ConsentCategory> => {
    const response = await apiClient.put<ConsentCategory>(`/consent-categories/${id}`, data);
    return response.data!;
  },

  deleteCategory: async (id: string): Promise<void> => {
    await apiClient.delete(`/consent-categories/${id}`);
  },
};

// Jurisdiction Services
export const jurisdictionService = {
  getJurisdictions: async (): Promise<Jurisdiction[]> => {
    const response = await apiClient.get<Jurisdiction[]>('/jurisdictions');
    return response.data!;
  },

  getJurisdiction: async (id: string): Promise<Jurisdiction> => {
    const response = await apiClient.get<Jurisdiction>(`/jurisdictions/${id}`);
    return response.data!;
  },
};

// Analytics Services
export const analyticsService = {
  getDashboardStats: async (): Promise<any> => {
    const response = await apiClient.get('/analytics/dashboard');
    return response.data!;
  },

  getConsentAnalytics: async (clientId?: string): Promise<any> => {
    const url = clientId ? `/analytics/consents?clientId=${clientId}` : '/analytics/consents';
    const response = await apiClient.get(url);
    return response.data!;
  },

  getComplianceReport: async (clientId?: string): Promise<any> => {
    const url = clientId ? `/analytics/compliance?clientId=${clientId}` : '/analytics/compliance';
    const response = await apiClient.get(url);
    return response.data!;
  },
};