import React from 'react'
import renderer from 'react-test-renderer'
import { configure, render, shallow } from 'enzyme'
import MenuItem from './MenuItem'
import Adapter from 'enzyme-adapter-react-16'
import { cleanup } from '@testing-library/react'

configure({ adapter: new Adapter() })

afterEach(cleanup)

const fakeDish = {
  _id: '1',
  name: 'Test Name',
  category: 'Test Category',
  method: 'Test Method',
  description: 'Test Description',
  engreediants: ['Test 1', 'Test 2', 'Test 3'],
  language: 'English',
  image: '/test-image',
}

const toggleSlider = (): void => {}

const setIndex = (): void => {}

it('Should renders without crashing', () => {
  render(
    <MenuItem
      _id={fakeDish._id}
      name={fakeDish.name}
      category={fakeDish.category}
      method={fakeDish.method}
      description={fakeDish.description}
      engreediants={fakeDish.engreediants}
      image={fakeDish.image}
      toggleSlider={toggleSlider}
      counter={1}
      setIndex={setIndex}
    />
  )
})

it('Should renders correctly with given props', () => {
  const menuItem = shallow(
    <MenuItem
      _id={fakeDish._id}
      name={fakeDish.name}
      category={fakeDish.category}
      method={fakeDish.method}
      description={fakeDish.description}
      engreediants={fakeDish.engreediants}
      image={fakeDish.image}
      toggleSlider={toggleSlider}
      counter={1}
      setIndex={setIndex}
    />
  )

  const expectedOutput = `<span class="menu__item__name">Test Name</span>`

  const realOutput = menuItem.find('.menu__item__name').html()
  expect(realOutput).toEqual(expectedOutput)
})

it('Should match the snapshot', () => {
  const tree = renderer
    .create(
      <MenuItem
        _id={fakeDish._id}
        name={fakeDish.name}
        category={fakeDish.category}
        method={fakeDish.method}
        description={fakeDish.description}
        engreediants={fakeDish.engreediants}
        image={fakeDish.image}
        toggleSlider={toggleSlider}
        counter={1}
        setIndex={setIndex}
      />
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
