import {
 render,
 screen,
 fireEvent,
} from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { setAutoFreeze } from "immer"
import userEvent from '@testing-library/user-event'
import { useCartStore } from '../../store/cart'
import CartItem from './'

setAutoFreeze(false)

const product = {
 title: 'Relógio bonitor',
 price: "22",
 image: "https://fpfportugalstorest01prd.blob.core.windows.net/blobfuse/images/KRBpzWaBs4kJ8A89LIdoDyLgGrwsH97cqrMT6qsVeRrfD5Wt3yDYfkaAQ6c7y46L.jpeg",
 id: "1"
}

const addToCart = jest.fn()

const renderCartItem = () => {
 render(<CartItem product={product} />)
}

describe('CartItem', () => {
 it('should render component', () => {
  renderCartItem()

  expect(screen.getByTestId('cart-item')).toBeInTheDocument()
 });

 it('should display proper content', () => {
  renderCartItem()

  const image = screen.getByRole("img")

  expect(screen.getByText(new RegExp(product.title, 'i'))).toBeInTheDocument()
  expect(screen.getByText(new RegExp(product.price, 'i'))).toBeInTheDocument()
  expect(image).toHaveProperty("src", product?.image)
  expect(image).toHaveProperty("alt", product?.title)
 });

 it('should display 1 as initial quantity', () => {
  renderCartItem()

  expect(screen.getByTestId('quantity').textContent).toBe('1')
 });

 it('should increase quantity by 1 when second button is clicked', async () => {
  renderCartItem()

  const button = screen.getByTestId('increase')

  await fireEvent.click(button)

  expect(screen.getByTestId('quantity').textContent).toBe('2')
 });

 it('should decrease quantity by 1 when first button is clicked', async () => {
  renderCartItem()
  const quantity = screen.getByTestId('quantity')

  const buttonIncrease = screen.getByTestId('increase')
  const buttonDecrese = screen.getByTestId('decrease')

  await fireEvent.click(buttonIncrease)
  expect(quantity.textContent).toBe('2')

  await fireEvent.click(buttonDecrese)
  expect(quantity.textContent).toBe('1')
 });

 it('should not go below zero uin the quantity', async () => {
  renderCartItem()
  const quantity = screen.getByTestId('quantity')

  const buttonDecrese = screen.getByTestId('decrease')
  expect(quantity.textContent).toBe('1')

  await fireEvent.click(buttonDecrese)
  await fireEvent.click(buttonDecrese)

  expect(quantity.textContent).toBe('0')
 });

 it('should call remove() when remove button is clicked', async () => {
  const { result } = renderHook(() => useCartStore())

  const spy = jest.spyOn(result.current.actions, 'remove')

  renderCartItem()

  const button = screen.getByRole('button', { name: /remove/i })

  await userEvent.click(button)

  expect(spy).toHaveBeenCalledTimes(1)
  expect(spy).toHaveBeenCalledWith(product)
 });
})