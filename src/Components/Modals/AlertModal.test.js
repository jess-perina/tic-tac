import React from 'react'
import { shallow } from 'enzyme'
import AlertModal from './AlertModal'

describe('AlertModal Component', () => {
  it('renders as expected', () => {
    expect(shallow(<AlertModal />)).toMatchSnapshot()
  })
})