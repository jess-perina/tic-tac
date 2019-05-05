import React from 'react'
import { shallow } from 'enzyme'
import ResetButton from './ResetButton'

describe('ResetButton Component', () => {
  it('renders as espected', () => {
    expect(shallow(<ResetButton />)).toMatchSnapshot()
  })
})