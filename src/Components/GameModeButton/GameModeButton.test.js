import React from 'react'
import { shallow } from 'enzyme'
import GameModeButton from './GameModeButton'

describe('GameModeButton Component', () => {
  it('renders as expected', () => {
    expect(shallow(<GameModeButton />)).toMatchSnapshot()
  })
})
