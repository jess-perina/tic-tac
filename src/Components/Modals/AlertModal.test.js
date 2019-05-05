import React from 'react'
import { shallow } from 'enzyme'
import AlertModal from './AlertModal'

describe('AlertModal Component', () => {
  it('renders as espected', () => {
    expect(shallow(<AlertModal />)).toMatchSnapshot()
  })
})