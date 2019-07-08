import React from 'react'
import { shallow } from 'enzyme'
import Board from './Board'

describe('Board Component', () => {
  const mockSquares = Array(9).fill(null)
  it('renders as expected', () => {
    expect(shallow(<Board squares={mockSquares} />)).toMatchSnapshot()
  })

  it('calls onClick event when square is clicked', () => {
    const onClick = jest.fn()
    const wrapper = shallow(<Board squares={mockSquares} onClick={onClick} />)
    wrapper.find('Square').first().simulate('click')
    expect(onClick).toHaveBeenCalled()
  })
})
