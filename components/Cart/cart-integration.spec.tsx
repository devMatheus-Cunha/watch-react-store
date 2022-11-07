import { renderHook, act } from "@testing-library/react-hooks"
import { render, screen } from "@testing-library/react";
import { useCartStore } from "../../store/cart"
import { makeServer, TServer } from '../../services/mirage/server'
import userEvent from "@testing-library/user-event"
import Cart from ".";

describe('Cart', () => {
 let server: TServer
 let result: any
 let spy: any
 let add: any
 let toggle: any
 let reset: any

 beforeEach(() => {
  server = makeServer({ environment: 'test' })
  result = renderHook(() => useCartStore()).result
  add = result.current.actions.add;
  reset = result.current.actions.reset;
  toggle = result.current.actions.toggle
  spy = jest.spyOn(result.current.actions, 'toggle')
 })

 afterEach(() => {
  server.shutdown()
  jest.clearAllMocks()
 })

 it('should add css class "hidden: in the component', () => {
  render(<Cart />)

  expect(screen.getByTestId('cart')).toHaveClass('hidden')
 });

 it('should not have css class "hidden: in the component', () => {
  act(() => {
   toggle()
  })

  render(<Cart />)

  expect(screen.getByTestId('cart')).not.toHaveClass('hidden')
 });

 it('should display 2 products cards', () => {
  const products = server.createList('product', 2)

  act(() => {
   for (const product of products) {
    add(product)
   }
  })

  render(<Cart />)

  expect(screen.getAllByTestId('cart-item')).toHaveLength(2)
 });

});