import Search from ".";

import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const doSearch = jest.fn()

describe('Search', () => {
 afterEach(() => {
  jest.clearAllMocks()
 })

 it('should render a form', () => {
  render(<Search doSearch={doSearch} />)

  expect(screen.getByRole('form')).toBeInTheDocument()
 });

 it('should render a input type equals search', () => {
  render(<Search doSearch={doSearch} />)

  expect(screen.getByRole('searchbox')).toHaveProperty('type', 'search')
 });

 it('should call props.doSearch when form is submitted', async () => {
  render(<Search doSearch={doSearch} />)

  const form = screen.getByRole('form')

  await fireEvent.submit(form)

  expect(doSearch).toHaveBeenCalledTimes(1)
 });

 it('should call props.doSearch when user input', async () => {
  render(<Search doSearch={doSearch} />)

  const textSubmitted = 'some text here'
  const form = screen.getByRole("form");
  const input = screen.getByRole("searchbox");

  await userEvent.type(input, textSubmitted)

  await fireEvent.submit(form)

  expect(doSearch).toHaveBeenCalledWith(textSubmitted)
 });

 it('should call doSeatch when search input is cleared', async () => {
  render(<Search doSearch={doSearch} />)

  const inputText = 'some text here'
  const input = screen.getByRole("searchbox");

  await userEvent.type(input, inputText)
  await userEvent.clear(input)

  expect(doSearch).toHaveBeenCalledTimes(1)
  expect(doSearch).toHaveBeenCalledWith('')
 });
})