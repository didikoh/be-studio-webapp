import { create } from 'zustand'

type UserInfo = {
  name: string
  phone: string
}

type UserState = {
  user: UserInfo | null
  login: (data: UserInfo) => void
  logout: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  login: (data) => set({ user: data }),
  logout: () => set({ user: null }),
}))
