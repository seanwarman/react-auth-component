import React from 'react'
import Auth from './Auth.js'
import { handleLogin, handleCheckAuth } from '../actions/App.js'
import './App.css'

const App = () => (

  <Auth
    browserToken="nice"
    login={handleLogin}
    checkAuth={handleCheckAuth}
  >
    <div>I'm logged in!</div>
  </Auth>

)

export default App
