import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow'
import Auth, { 
  getLocalStore, 
  Loading, 
  loginAndSetToken ,
} from './Auth.js'

const setup = (props = {}) => {

  const renderer = createRenderer()

  renderer.render(<Auth {...props} />)
  const output = renderer.getRenderOutput()
  return output

}

describe('Auth', () => {

  it('should render the Loading component', () => {
    const output = setup()
    if(!output.props.renderLoading) expect(output.type).toBe(Loading)
  })

})

describe('Auth functions', () => {

  describe('getBrowserToken', () => {

    it('should return an object if no params present', () => {
      expect(typeof getLocalStore()).toBe('object')
    })

  })

  describe('loginAndSetToken', () => {

    it('should return a function', () => {
      expect(typeof loginAndSetToken(
        jest.fn(),
        jest.fn(),
        jest.fn(),
      ) === 'function').toBe(true)
    })

  })

})

