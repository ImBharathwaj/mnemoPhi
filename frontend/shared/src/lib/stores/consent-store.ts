import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Consent, ConsentCategory } from '@/types';

interface ConsentState {
  categories: ConsentCategory[];
  userConsents: Consent[];
  isLoading: boolean;
  error: string | null;
}

interface ConsentActions {
  setCategories: (categories: ConsentCategory[]) => void;
  setUserConsents: (consents: Consent[]) => void;
  updateConsent: (consentId: string, granted: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type ConsentStore = ConsentState & ConsentActions;

export const useConsentStore = create<ConsentStore>()(
  persist(
    (set, get) => ({
      // State
      categories: [],
      userConsents: [],
      isLoading: false,
      error: null,

      // Actions
      setCategories: (categories: ConsentCategory[]) => {
        set({ categories });
      },

      setUserConsents: (consents: Consent[]) => {
        set({ userConsents: consents });
      },

      updateConsent: (consentId: string, granted: boolean) => {
        const { userConsents } = get();
        const updatedConsents = userConsents.map(consent =>
          consent.id === consentId ? { ...consent, granted } : consent
        );
        set({ userConsents: updatedConsents });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'consent-storage',
      partialize: (state) => ({
        categories: state.categories,
        userConsents: state.userConsents,
      }),
    }
  )
);