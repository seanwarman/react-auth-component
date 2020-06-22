import React, { useState } from 'react'

async function handleLogin({
  login,
  username,
  password,
  setMessages
}) {

  if(username.length === 0) {
    return setMessages({
      username: 'Please fill in a username',
    })
  }

  if(password.length === 0) {
    return setMessages({
      password: 'Please fill in a password',
    })
  }

  const token = await login({
    username,
    password
  })

  if(!token) {
    return setMessages({
      general: 'Password or username incorrect, please try again.'
    })
  }

  return token


}

export default function Login({
  login,
}) {

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ messages, setMessages ] = useState({
    username: undefined,
    password: undefined,
    general:  undefined
  })

  return (
    <div>
      {
        messages.general &&
          <div>{messages.general}</div>
      }
      <div>
        <label>Username</label>
        <input 
          onChange={e => setUsername(e.target.value)}
          type="input"
        />
        {
          messages.username &&
            <div>{messages.username}</div>
        }
      </div>
      <div>
        <label>Password</label>
        <input 
          onChange={e => setPassword(e.target.value)}
          type="password"
        />
        {
          messages.password &&
            <div>{messages.password}</div>
        }
      </div>
      <button
        onClick={() => handleLogin({
          login,
          username,
          password,
          setMessages
        })}
      >
        Submit
      </button>
    </div>
  )
}

