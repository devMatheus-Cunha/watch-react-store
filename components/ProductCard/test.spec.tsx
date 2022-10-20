import {
 render,
 screen,
 fireEvent,
} from '@testing-library/react'
import ProductCard from './'

const product = {
 title: 'Relógio bonitor',
 price: "22",
 image: "https://fpfportugalstorest01prd.blob.core.windows.net/blobfuse/images/KRBpzWaBs4kJ8A89LIdoDyLgGrwsH97cqrMT6qsVeRrfD5Wt3yDYfkaAQ6c7y46L.jpeg",
 id: "1"
}

const addToCart = jest.fn()

const renderProductCard = () => {
 render(<ProductCard product={product} addToCart={addToCart} />)
}

describe('ProductCard', () => {
 it('should render component', () => {
  renderProductCard()

  expect(screen.getByTestId('product-card')).toBeInTheDocument()
 });

 it('should display proper content', () => {
  renderProductCard()

  expect(screen.getByText(new RegExp(product.title, 'i'))).toBeInTheDocument()
  expect(screen.getByText(new RegExp(product.price, 'i'))).toBeInTheDocument()
  expect(screen.getByTestId("image")).toHaveStyle({
   backgroundImage: product?.image
  })
 });

 it('should call props.addToCart() when button gets clicked', async () => {
  renderProductCard()

  const button = screen.getByRole('button')

  await fireEvent.click(button)

  expect(addToCart).toHaveBeenCalledTimes(1)
  expect(addToCart).toHaveBeenCalledWith(product)
 });
})