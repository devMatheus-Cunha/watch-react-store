import create from 'zustand'

interface IUseCartStore {
 state: {
  open: boolean
 }
 actions: {
  toggle: () => void
 }
}

export const useCartStore = create<IUseCartStore>((set) => ({
 state: {
  open: false
 },
 actions: {
  toggle: () => set((store: any) => ({ state: { open: !store.state.open } })),
 },
}))