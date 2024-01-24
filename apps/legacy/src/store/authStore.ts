import { Model } from '@music/types';
import { create } from 'zustand';

import { getAuthedUser, logout } from '@/api/auth';

interface AuthStore {
  user: Model.UserInfo | null;
  setUser: (user: AuthStore['user']) => void;
  fetchUser: () => Promise<Model.UserInfo | null>;
  logout: () => void;
}
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    const user = await getAuthedUser().catch(() => null);
    set({ user });
    return user;
  },
  logout: async () => {
    await logout().catch(() => null);
    set({ user: null });
    return null;
  },
}));
