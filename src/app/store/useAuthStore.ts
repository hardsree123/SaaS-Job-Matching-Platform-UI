import { create } from 'zustand';

export type Role = 'candidate' | 'recruiter' | null;

export interface UserContext {
    id: string;
    name: string;
    email?: string;
    avatar?: string;
    token?: string;
}

interface AuthState {
    role: Role;
    user: UserContext | null;
    setRole: (role: Role) => void;
    setUser: (user: UserContext | null) => void;
    login: (role: Role, user: UserContext) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    role: 'candidate', // Default to candidate for UI testing purposes initially
    user: {
        id: 'user-1',
        name: 'Ahmed Hassan',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
    },
    setRole: (role) => set({ role }),
    setUser: (user) => set({ user }),
    login: (role, user) => set({ role, user }),
    logout: () => set({ role: null, user: null }),
}));
