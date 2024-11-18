import { create } from 'zustand';

interface User {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  users: User[];
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  users: [],
  login: (email, password) => {
    const users = useAuthStore.getState().users;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      set({ user, isAuthenticated: true });
      return true;
    }
    return false;
  },
  signup: (email, password) => {
    const users = useAuthStore.getState().users;
    if (users.some(u => u.email === email)) {
      return false;
    }
    const newUser = { email, password };
    set(state => ({ users: [...state.users, newUser] }));
    return true;
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));