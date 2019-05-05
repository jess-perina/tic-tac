import React from 'react'
import { shallow } from 'enzyme'
import MovesList from './MovesList'

describe('MovesList Component', () => {
  it('renders as espected', () => {
    expect(shallow(<MovesList />)).toMatchSnapshot()
  })
})