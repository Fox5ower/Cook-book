import React from 'react'
import renderer from 'react-test-renderer'
import { render } from '@testing-library/react'
import Input from './Input'

const fakeProps = {
  name: 'Test name',
  placeholder: 'Test Placeholder',
  maxLength: 12,
  value: 'Test Value',
}

it('Should render Recipes preview', () => {
  const { getByLabelText } = render(
    <Input
      name={fakeProps.name}
      placeholder={fakeProps.placeholder}
      maxLength={fakeProps.maxLength}
      value={fakeProps.value}
    />
  )

  const placeholderText = getByLabelText(/Test Placeholder/i)
  expect(placeholderText).toBeInTheDocument()
})

it('Should match the snapshot', () => {
  const tree = renderer
    .create(
      <Input
        name={fakeProps.name}
        placeholder={fakeProps.placeholder}
        maxLength={fakeProps.maxLength}
        value={fakeProps.value}
      />
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
