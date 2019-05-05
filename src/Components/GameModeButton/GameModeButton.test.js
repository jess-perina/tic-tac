import React from 'react'
import { shallow } from 'enzyme'
import GameModeButton from './GameModeButton'

describe('GameModeButton Component', () => {
  it('renders as espected', () => {
    expect(shallow(<GameModeButton />)).toMatchSnapshot()
  })
})