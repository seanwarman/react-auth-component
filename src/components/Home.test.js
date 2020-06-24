import React from 'react'
import TestRenderer from 'react-test-renderer'
import Home from './Home.js'

const setup = (props = {
  logout: jest.fn(),
  store: { username: '' }
}) => {

  return TestRenderer.create(<Home {...props} />).root

}


describe('Home', () => {

  it('should render', () => {

    const output = setup()
    expect(output.type).toBe(Home)

  })

  it('should have at least one button with data-test: logout and onClick: logout prop', () => {
    const output = setup()

    const buttons = output.findAllByType('button')

    const button = buttons.find(el => (

      el.props['data-test'] === 'logout'

    ))

    expect(button).toBeDefined()

    expect(button.props.onClick).toBe(output.props.logout)



  })

})

