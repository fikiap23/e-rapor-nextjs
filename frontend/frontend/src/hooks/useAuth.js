import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const useAuth = create(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      removeToken: () => set({ token: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useAuth
