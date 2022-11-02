import {
 render,
 screen,
 fireEvent,
 waitFor,
} from '@testing-library/react'
import ProductList from '../pages/index'
import { makeServer, TServer } from '../services/mirage/server'
import userEvent from "@testing-library/user-event"
import { Response } from "miragejs"

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

 it('should display error message when promise rejects', async () => {
  server.get('products', () => {
   return new Response(500, {}, '')
  })

  renderProductList()

  await waitFor(() => {
   expect(screen.getByTestId('server-products')).toBeInTheDocument()
   expect(screen.queryByTestId('no-products')).toBeNull()
   expect(screen.queryAllByTestId('product-card')).toHaveLength(0)
  })
 });

 it('should filter the product list when a search is perfomed', async () => {
  const searchTerm = 'Relógio bonito'
  server.createList('product', 2)

  server.create('product', {
   title: searchTerm,
  } as object)

  renderProductList()

  await waitFor(() => {
   expect(screen.getAllByTestId("product-card")).toHaveLength(3);
  });

  const form = screen.getByRole('form')
  const input = screen.getByRole('searchbox')

  await userEvent.type(input, searchTerm)
  await fireEvent.submit(form)

  await waitFor(() => {
   expect(screen.getAllByTestId("product-card")).toHaveLength(1);
  });
 });

 it('should display the total quantity of products', async () => {
  server.createList('product', 10)

  renderProductList()

  await waitFor(() => {
   expect(screen.getByText(/10 Products/i)).toBeInTheDocument();
  });
 });

 it('should display product (singular) when there is only 1 product', async () => {
  server.create('product')

  renderProductList()

  await waitFor(() => {
   expect(screen.getByText(/1 Product$/i)).toBeInTheDocument();
  });
 });
})