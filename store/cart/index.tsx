import produce from 'immer'
import create from 'zustand'

export type TProduct = {
  id: string;
  image: string;
  price: string;
  title: string;
  quantity: number
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
    increase: (data: TProduct) => void
    decrease: (data: TProduct) => void
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
          const doesntExist = !state.products?.find((({ id }) => id === product.id))

          if (doesntExist) {
            if (!product.quantity) {
              product.quantity = 1
            }
            state.products.push(product)
            state.open = true
          }
        })
      },
      increase(product: TProduct) {
        setState(({ state }: TState) => {
          const localProduct = state.products.find(({ id }) => id === product.id)
          if (localProduct) {
            localProduct.quantity++
          }
        })
      },
      decrease(product: TProduct) {
        setState(({ state }: TState) => {
          const localProduct = state.products.find(({ id }) => id === product.id)
          if (localProduct && localProduct.quantity > 0) {
            localProduct.quantity--
          }
        })
      },
    },
  }
})