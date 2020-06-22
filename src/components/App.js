import React from 'react'
import Auth from './Auth.js'
import Login from './Login.js'
import Home from './Home.js'
import { handleLogin, handleCheckAuth } from '../actions/App.js'
import './App.css'

const App = () => (

  <div id="app">
    <Auth
      tokenLabel="nice"
      login={handleLogin}
      checkAuth={handleCheckAuth}
      renderUnauthenticated={login => <Login login={login} />}
    >
      <Home />
    </Auth>
  </div>

)

export default App
