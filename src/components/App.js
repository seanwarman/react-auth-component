import React from 'react'
import Auth from './Auth.js'
import Login from './Login.js'
import Home from './Home.js'
import { handleLogin, handleCheckAuth } from '../actions/App.js'
import './App.css'

const App = () => (

  <Auth
    tokenLabel="nice"
    login={handleLogin}
    checkAuth={handleCheckAuth}
    renderUnauthenticated={login => <Login login={login} />}
  >
    <Home />
  </Auth>

)

export default App
