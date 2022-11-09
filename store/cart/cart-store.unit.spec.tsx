import { renderHook, act } from "@testing-library/react-hooks"
import { useCartStore } from "../../store/cart"
import { makeServer, TServer } from '../../services/mirage/server'

describe('Cart Store', () => {
  let server: TServer
  let result: any
  let add: any
  let remove: any
  let removeAll: any
  let toggle: () => void;

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
    result = renderHook(() => useCartStore()).result
    add = result.current.actions.add;
    remove = result.current.actions.remove;
    removeAll = result.current.actions.removeAll;
    toggle = result.current.actions.toggle
  })

  afterEach(() => {
    server.shutdown()
    act(() => result.current.actions.reset())
  })

  it('should return open equals false on initial state', async () => {
    expect(result.current.state.open).toBe(false)
  });

  it('should return an empty a array for products on initial state', async () => {
    expect(Array.isArray(result.current.state.products)).toBe(true)
    expect(result.current.state.products).toHaveLength(0)
  });

  it('should increase products when addProduct functions is called', async () => {
    const products = server.createList('product', 2)

    for (const product of products) {
      act(() => add(product))
    }

    expect(result.current.state.products).toHaveLength(2)
  });

  fit('should add 2 products to the list and open the cart', async () => {
    const products = server.createList('product', 2)

    for (const product of products) {
      act(() => {
        add(product)
      })
    }
    expect(result.current.state.open).toBe(true)
    expect(result.current.state.products).toHaveLength(2)
  });

  it('should not add same product twice', async () => {
    const product = server.create('product')

    act(() => add(product))
    act(() => add(product))

    expect(result.current.state.products).toHaveLength(1)
  });

  it('should toggle open state', async () => {
    expect(result.current.state.open).toBe(false)
    expect(result.current.state.products).toHaveLength(0)

    act(() => toggle())
    expect(result.current.state.open).toBe(true)

    act(() => toggle())
    expect(result.current.state.open).toBe(false)
    expect(result.current.state.products).toHaveLength(0)
  });

  it('should remove a product from the store', async () => {
    const [productOne, productTwo] = server.createList('product', 2)

    act(() => {
      add(productOne)
      add(productTwo)
    })

    expect(result.current.state.products).toHaveLength(2)

    act(() => {
      remove(productTwo)
    })

    expect(result.current.state.products).toHaveLength(1)
    expect(result.current.state.products[0]).toEqual(productOne)
  });

  it('should remove all a product from the store', async () => {
    const products = server.createList('product', 2)

    act(() => {
      for (const product of products) {
        add(product)
      }
    })

    expect(result.current.state.products).toHaveLength(2)

    act(() => {
      removeAll()
    })

    expect(result.current.state.products).toHaveLength(0)
  });
});