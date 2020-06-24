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

}

function onEnter({
    login,
    username,
    password,
    setMessages
  }) {

  return function(e) {

    if (e.keyCode === 13) handleLogin({
      login,
      username,
      password,
      setMessages
    })

  }
  
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
    <div id="login">
      {
        messages.general &&
          <div className="error">{messages.general}</div>
      }
      <div>
        <label>Username</label>
        <input 
          onKeyUp={onEnter({
            login,
            username,
            password,
            setMessages
          })}
          onChange={e => setUsername(e.target.value)}
          type="input"
        />
        {
          messages.username &&
            <div className="error">{messages.username}</div>
        }
      </div>
      <div>
        <label>Password</label>
        <input
          onKeyUp={onEnter({
            login,
            username,
            password,
            setMessages
          })}
          onChange={e => setPassword(e.target.value)}
          type="password"
        />
        {
          messages.password &&
            <div className="error">{messages.password}</div>
        }
      </div>
      <div style={{textAlign: 'right'}}>
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
    </div>
  )
}

