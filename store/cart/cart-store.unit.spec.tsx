import { renderHook, act } from "@testing-library/react-hooks"
import { useCartStore } from "../../store/cart"
import { makeServer, TServer } from '../../services/mirage/server'

describe('Cart Store', () => {
  let server: TServer
  let result: any
  let add: any
  let toggle: () => void;

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
    result = renderHook(() => useCartStore()).result
    add = result.current.actions.add;
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

  it('should toggle open state', async () => {
    expect(result.current.state.open).toBe(false)

    act(() => toggle())
    expect(result.current.state.open).toBe(true)

    act(() => toggle())
    expect(result.current.state.open).toBe(false)
  });
});