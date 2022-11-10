import { renderHook, act as hooksAct } from "@testing-library/react-hooks"
import { render, screen } from "@testing-library/react";
import { useCartStore } from "../../store/cart"
import { makeServer, TServer } from '../../services/mirage/server'
import { setAutoFreeze } from "immer"
import userEvent from "@testing-library/user-event"
import Cart from ".";
import TestRenderer from 'react-test-renderer'

setAutoFreeze(false)

const { act: componentsAct } = TestRenderer

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

 it('should not have css class "hidden: in the component', async () => {
  await componentsAct(async () => {
   render(<Cart />)

   const button = screen.getByTestId('close-button')

   await userEvent.click(button)

   expect(screen.getByTestId('cart')).not.toHaveClass('hidden')
  })
 });

 it('should call store toggle() twice', async () => {
  await componentsAct(async () => {
   render(<Cart />)

   const button = screen.getByTestId('close-button')

   await userEvent.click(button)
   await userEvent.click(button)

   expect(spy).toHaveBeenCalledTimes(2)
  })
 });

 it('should display 2 products cards', () => {
  const products = server.createList('product', 2)

  hooksAct(() => {
   for (const product of products) {
    add(product)
   }
  })

  render(<Cart />)

  expect(screen.getAllByTestId('cart-item')).toHaveLength(2)
 });

});