import {
 render,
 screen,
 fireEvent,
 waitFor,
} from '@testing-library/react'
import ProductList from '../pages/index'
import { makeServer, TServer } from '../services/mirage/server'

const renderProductList = () => {
 render(<ProductList />)
}

describe('ProductList', () => {
 let server: TServer

 beforeEach(() => {
  server = makeServer({ environment: 'test' })
 })

 afterEach(() => {
  server.shutdown()
 })

 it('should render page ProductList', () => {
  renderProductList()

  expect(screen.getByTestId('product-list')).toBeInTheDocument()
 });

 it('should render the ProductCard component 10 times', async () => {
  server.createList('product', 10)
  renderProductList()
  await waitFor(() => {
   expect(screen.getAllByTestId('product-card')).toHaveLength(10)
  })
 });

 it('should render the "no products message"', async () => {
  renderProductList()

  await waitFor(() => {
   expect(screen.getByTestId('no-products')).toBeInTheDocument()
  })
 });
})