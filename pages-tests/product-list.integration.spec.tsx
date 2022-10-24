import {
 render,
 screen,
 fireEvent,
} from '@testing-library/react'
import ProductList from '../pages/index'

describe('ProductList', () => {
 it('should render page ProductList', () => {
  render(<ProductList />)

  expect(screen.getByTestId('product-list')).toBeInTheDocument()
 });
})