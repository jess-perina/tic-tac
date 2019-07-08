import React from 'react'
import { shallow, mount } from 'enzyme'
import Square from './Square'

describe('Square Component', () => {
  it('renders as expected', () => {
    expect(shallow(<Square />)).toMatchSnapshot()
  })

  it('displays the correct value', () => {
    const wrapper = mount(<Square value={4} />)
    const value = wrapper.find('button').render().text()
    expect(value).toBe('4')
  })

  it('calls onClick event when square is clicked', () => {
    const onClick = jest.fn()
    const wrapper = shallow(<Square onClick={onClick} />)
    wrapper.find('button').simulate('click')
    expect(onClick).toHaveBeenCalled()
  })
})
