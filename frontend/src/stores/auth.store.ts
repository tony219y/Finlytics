import { create } from 'zustand'

interface AuthState {
    token: string | null
    setToken: (token: string) => void
    clearToken: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem('token'),
    setToken: (token) => { //login
        localStorage.setItem('token', token)
        set({ token })
    },
    clearToken: () => { //logout
        localStorage.removeItem('token')
        set({ token: null })
    },
}))
