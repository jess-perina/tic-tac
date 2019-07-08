import React from 'react'
import { shallow } from 'enzyme'
import MasterGame from './MasterGame'

describe('MasterGame Component', () => {
  it('renders as expected', () => {
    expect(shallow(<MasterGame />)).toMatchSnapshot()
  })
})
