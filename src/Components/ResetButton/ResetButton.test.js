import React from 'react'
import { shallow } from 'enzyme'
import ResetButton from './ResetButton'

describe('ResetButton Component', () => {
  it('renders as expected', () => {
    expect(shallow(<ResetButton />)).toMatchSnapshot()
  })

  it('calls onClick event when button is clicked', () => {
    const resetGame = jest.fn()
    const wrapper = shallow(<ResetButton resetGame={resetGame} />)
    wrapper.find('button').simulate('click')
    expect(resetGame).toHaveBeenCalled()
  })
})
