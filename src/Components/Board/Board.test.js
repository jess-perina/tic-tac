import React from 'react'
import { shallow } from 'enzyme'
import Board from './Board'

describe('Board Component', () => {
  const mockSquares = []
  it('renders as espected', () => {
    expect(shallow(<Board squares={mockSquares}/>)).toMatchSnapshot()
  })
})