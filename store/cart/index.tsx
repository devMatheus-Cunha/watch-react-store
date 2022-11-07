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

const addProduct = (store: any, product: any) => {
  if (store.state.products.includes(product)) {
    return store.state.products
  }
  return [...store.state.products, product]
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
      set((store) => {
        return {
          state: {
            open: true,
            products: addProduct(store, product)
          }
        }
      }),
  },
}))