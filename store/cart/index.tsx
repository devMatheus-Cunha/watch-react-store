import create from 'zustand'

interface IUseCartStore {
  state: {
    open: boolean,
    products: any[]
  }
  actions: {
    toggle: () => void
    add: (data: any) => void
    reset: () => void
  }
}

const initialState = {
  open: false,
  products: [],
}

export const useCartStore = create<IUseCartStore>((set) => ({
  state: initialState,
  actions: {
    toggle: () =>
      set((store) => ({
        state: { ...store.state, open: !store.state.open },
      })),
    reset: () =>
      set(() => ({
        state: { ...initialState },
      })),
    add: (product) =>
      set((store) => ({
        state: {
          open: true,
          products: [...store.state.products, product]
        }
      })),
  },
}))