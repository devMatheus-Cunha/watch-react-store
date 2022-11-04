import { renderHook, act } from "@testing-library/react-hooks"
import { useCartStore } from "../../store/cart"
import { makeServer, TServer } from '../../services/mirage/server'

describe('Cart Store', () => {
  let server: TServer

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
  })

  afterEach(() => {
    server.shutdown()
  })

  it('should return open equals false on initial state', async () => {
    const { result } = renderHook(() => useCartStore())

    expect(result.current.state.open).toBe(false)
  });

  it('should return an empty a array for products on initial state', async () => {
    const { result } = renderHook(() => useCartStore())

    expect(Array.isArray(result.current.state.products)).toBe(true)
    expect(result.current.state.products).toHaveLength(0)
  });

  it('should toggle open state', async () => {
    const { result } = renderHook(() => useCartStore())
    const { actions: { toggle } } = result.current

    expect(result.current.state.open).toBe(false)

    act(() => toggle())
    expect(result.current.state.open).toBe(true)

    act(() => toggle())
    expect(result.current.state.open).toBe(false)
  });
});