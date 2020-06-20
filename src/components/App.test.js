import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow'
import App from './App.js'
import Auth from './Auth.js'

const setup = (props = {}) => {
  const renderer = createRenderer()

  renderer.render(<App {...props} />)
  const output = renderer.getRenderOutput()
  return output
}

describe('App children: ', () => {

  describe('Auth', () => {
    it('should render', () => {
      const output = setup()
      expect(output.type).toBe(Auth)
    })
  })

})
