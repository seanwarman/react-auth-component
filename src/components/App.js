import React from 'react'
import Auth from './Auth.js'
import { get, post } from '../lib/api.js'
import './App.css'

// login should return a token otherwise return null or undefined
async function login() {

  const res = await post('/login', {
    username: 'jeff1967',
    password: 'hotdog'
  })

  if(res instanceof Error || !res?.data?.token) return null

  return res.data.token

}

// checkAuth should return either true or false
async function checkAuth(token) {

  const res = await get('/verifyToken', {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  if(res instanceof Error) return false

  return true

}

const App = () => (
  <Auth
    browserToken="nice"
    login={login}
    checkAuth={checkAuth}
  >
    <div>I'm logged in!</div>
  </Auth>
)

export default App
