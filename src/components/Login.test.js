import React from 'react'
import TestRenderer from 'react-test-renderer'
import Login from './Login.js'

const setup = (props = {}) => {

  const testRenderer = TestRenderer.create(<Login />);
  return testRenderer.root;

}

describe('Login', () => {

  const login = setup()

  it('should render', () => {

    expect(login.type).toBe(Login)

  })

  it('should have a button with an onClick', () => {

    const button = login.findByType('button')

    expect(button.type).toBe('button')
    expect(button.props.onClick).toBeDefined()

  })

  it('should have two label elements', () => {
    const labels = login.findAllByType('label')
    expect(labels.length).toBe(2)

  })

  it('should have two input elements, both with onChange props', () => {
    const inputs = login.findAllByType('input')
    expect(inputs.length).toBe(2)

    inputs.forEach(input => {
      expect(input.props.onChange).toBeDefined()

    })
  })

})
