import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { render, cleanup } from '@testing-library/react'
import DishDetailed from './DishDetailed'
import { IntlProvider } from 'react-intl'
import English from '../languages/en.json'

afterEach(cleanup)

const fakeDish = {
  _id: '1',
  name: 'Test Name',
  category: 'Test Category',
  method: 'Test Method',
  description: 'Test Description',
  engreediants: ['Test 1', 'Test 2', 'Test 3'],
  language: 'Test Lang',
  image: '/test-image',
}

const toggleDescription = (): void => {}

it('Should renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <IntlProvider locale="en" messages={English}>
      <DishDetailed
        dish={fakeDish}
        toggleDescription={toggleDescription}
        showing={false}
      />
    </IntlProvider>,
    div
  )
})

it('Should renders with given props', () => {
  const { getByText } = render(
    <IntlProvider locale="en" messages={English}>
      <DishDetailed
        dish={fakeDish}
        toggleDescription={toggleDescription}
        showing={false}
      />
    </IntlProvider>
  )
  expect(getByText('Test 1')).toBeInTheDocument()
  expect(getByText('Test 2')).toBeInTheDocument()
  expect(getByText('Test 3')).toBeInTheDocument()
  expect(getByText('Test Method')).toBeInTheDocument()
})

it('Should match the snapshot', () => {
  const tree = renderer
    .create(
      <IntlProvider locale="en" messages={English}>
        <DishDetailed
          dish={fakeDish}
          toggleDescription={toggleDescription}
          showing={false}
        />
      </IntlProvider>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
