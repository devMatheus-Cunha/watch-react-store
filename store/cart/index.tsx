import produce from 'immer'
import create from 'zustand'

export type TProduct = {
  id: string;
  image: string;
  price: string;
  title: string;
};

interface IUseCartStore {
  state: {
    open: boolean,
    products: TProduct[]
  }
  actions: {
    toggle: () => void
    add: (data: TProduct) => void
    reset: () => void
    removeAll: () => void
    remove: (data: TProduct) => void
  }
}

type TState = Pick<IUseCartStore, "state">

const initialState = {
  open: false,
  products: [],
}

export const useCartStore = create<IUseCartStore>((set) => {
  const setState = (fn: any) => set(produce(fn) as any)

  return {
    state: initialState,
    actions: {
      toggle() {
        setState(({ state }: TState) => {
          state.open = !state.open
        })
      },
      reset() {
        setState((store: TState) => {
          store.state = initialState
        })
      },
      remove(product: TProduct) {
        setState(({ state }: TState) => {
          const exists = !!state.products?.find((({ id }) => id === product.id))

          if (exists) {
            state.products = state.products.filter(({ id }) => {
              return id !== product.id
            })
          }
        })
      },
      removeAll() {
        setState(({ state }: TState) => {
          state.products = []
        })
      },
      add(product: TProduct) {
        setState(({ state }: TState) => {
          if (!state.products.includes(product)) {
            state.products.push(product)
          }
        })
      },
    },
  }
})