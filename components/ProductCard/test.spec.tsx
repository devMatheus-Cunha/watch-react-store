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

describe('ProductCard', () => {
 it('should render component', () => {
  render(<ProductCard product={product} />)

  expect(screen.getByTestId('product-card')).toBeInTheDocument()
 });

 it('should display proper content', () => {
  render(<ProductCard product={product} />)

  expect(screen.getByText(new RegExp(product.title, 'i'))).toBeInTheDocument()
  expect(screen.getByText(new RegExp(product.price, 'i'))).toBeInTheDocument()
  expect(screen.getByTestId("image")).toHaveStyle({
   backgroundImage: product?.image
  })
 });
})