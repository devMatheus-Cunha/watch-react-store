import {
 render,
 screen,
 fireEvent,
} from '@testing-library/react'
import CartItem from './'

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
})