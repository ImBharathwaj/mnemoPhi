import { create } from 'zustand';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

interface UIState {
  sidebarOpen: boolean;
  notifications: Notification[];
  modals: Record<string, boolean>;
}

interface UIActions {
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
  isModalOpen: (id: string) => boolean;
}

type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>((set, get) => ({
  // State
  sidebarOpen: false,
  notifications: [],
  modals: {},

  // Actions
  setSidebarOpen: (open: boolean) => {
    set({ sidebarOpen: open });
  },

  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },

  addNotification: (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { ...notification, id };
    
    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Auto-remove notification after duration
    const duration = notification.duration || 5000;
    setTimeout(() => {
      get().removeNotification(id);
    }, duration);
  },

  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id),
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },

  openModal: (id: string) => {
    set((state) => ({
      modals: { ...state.modals, [id]: true },
    }));
  },

  closeModal: (id: string) => {
    set((state) => ({
      modals: { ...state.modals, [id]: false },
    }));
  },

  isModalOpen: (id: string) => {
    return get().modals[id] || false;
  },
}));