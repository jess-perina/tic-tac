import React from 'react'
import { shallow } from 'enzyme'
import Square from './Square'

describe('Square Component', () => {
  it('renders as espected', () => {
    expect(shallow(<Square />)).toMatchSnapshot()
  })
})
