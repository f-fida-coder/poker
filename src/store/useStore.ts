import { create } from 'zustand';

interface User {
  id: string;
  username: string;
  avatar: string;
  balance: number;
  level: number;
}

interface StoreState {
  user: User | null;
  isAuthenticated: boolean;
  soundEnabled: boolean;
  login: (user: User) => void;
  logout: () => void;
  toggleSound: () => void;
  updateBalance: (amount: number) => void;
}

export const useStore = create<StoreState>((set) => ({
  user: null,
  isAuthenticated: false,
  soundEnabled: true,

  login: (user: User) => set({ user, isAuthenticated: true }),

  logout: () => set({ user: null, isAuthenticated: false }),

  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

  updateBalance: (amount: number) =>
    set((state) => ({
      user: state.user ? { ...state.user, balance: state.user.balance + amount } : null,
    })),
}));
