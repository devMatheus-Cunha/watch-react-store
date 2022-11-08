import produce from 'immer'
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

type TypeState = Pick<IUseCartStore, "state">

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
        setState(({ state }: TypeState) => {
          state.open = !state.open
        })
      },
      reset() {
        setState((store: TypeState) => {
          store.state = initialState
        })
      },
      add(product) {
        setState(({ state }: TypeState) => {
          if (!state.products.includes(product)) {
            state.products.push(product)
          }
        })
      },
    },
  }
})