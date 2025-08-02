import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

interface AuthActions {
    setAuth: (user: User, token: string) => void;
    clearAuth: () => void;
    setLoading: (loading: boolean) => void;
    updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
    persist(
        (set, get) => ({
            // State
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,

            // Actions
            setAuth: (user: User, token: string) => {
                localStorage.setItem('auth_token', token);
                localStorage.setItem('user_data', JSON.stringify(user));
                set({
                    user,
                    token,
                    isAuthenticated: true,
                    isLoading: false,
                });
            },

            clearAuth: () => {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user_data');
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
            },

            setLoading: (loading: boolean) => {
                set({ isLoading: loading });
            },

            updateUser: (userData: Partial<User>) => {
                const currentUser = get().user;
                if (currentUser) {
                    const updatedUser = { ...currentUser, ...userData };
                    localStorage.setItem('user_data', JSON.stringify(updatedUser));
                    set({ user: updatedUser });
                }
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
