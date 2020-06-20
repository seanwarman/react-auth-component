import React, { useEffect, useState } from 'react'

const styles = {
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const Unauthenticated = ({
  login,
  setToken,
  browserToken,
}) => {
  return <div
    style={styles}
  >
    Not logged in!
    <button
      onClick={loginAndSetToken({setToken, login, browserToken})}
    >Login</button>
  </div>
}

const Loading = () => {
  return <div style={styles}>
    <div>Loading...</div>
  </div>
}

function setBrowserToken(browserToken, token) {
  if(browserToken) window.localStorage.setItem(browserToken, token)
}

function getBrowserToken(browserToken) {
  if(browserToken) return window.localStorage.getItem(browserToken)
  return null
}

function loginAndSetToken({
  login,
  setToken,
  browserToken
}) {

  return async function() {
    const token = await login()

    if(typeof token !== 'string') {
      setBrowserToken(browserToken, null)
      setToken(null)
    }

    setBrowserToken(browserToken, token)
    setToken(token)
  }
}

async function checkAuthAndSetState({
  setLoading,
  setAuthenticated,
  checkAuth,
  token
}) {

  if(await checkAuth(token)) {
    setAuthenticated(true)
  } else {
    setAuthenticated(false)
  }

  setLoading(false)
}

export default function Auth({
  checkAuth,
  children,
  renderUnauthenticated,
  renderLoading,
  login,
  browserToken
}) {

  const [loadingState, setLoading] = useState(true)
  const [authenticatedState, setAuthenticated] = useState(false)
  const [token, setToken] = useState(getBrowserToken(browserToken))

  useEffect(() => {

    checkAuthAndSetState({
      setLoading,
      setAuthenticated,
      checkAuth,
      token
    })

  }, [token])

  return (

    loadingState && renderLoading ?
    renderLoading()
    :
    loadingState && !renderLoading ?
    <Loading />
    :
    authenticatedState ?
    children
    :
    renderUnauthenticated ?
    renderUnauthenticated(
      loginAndSetToken({
        login, 
        setToken, 
        browserToken
      })
    )
    :
    <Unauthenticated 
      login={login}
      setToken={setToken}
      browserToken={browserToken}
    />

  )
}

