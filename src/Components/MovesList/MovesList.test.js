import React from 'react'
import { shallow } from 'enzyme'
import MovesList from './MovesList'

describe('MovesList Component', () => {
  it('renders as expected', () => {
    expect(shallow(<MovesList />)).toMatchSnapshot()
  })
})