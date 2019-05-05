import React from 'react'
import { shallow } from 'enzyme'
import PlayerModeButton from './PlayerModeButton'

describe('PlayerModeButton Component', () => {
  it('renders as espected', () => {
    expect(shallow(<PlayerModeButton />)).toMatchSnapshot()
  })
})