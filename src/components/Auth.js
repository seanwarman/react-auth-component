import React, { useEffect, useState } from 'react'

export const styles = {
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export const Unauthenticated = ({
  loginAndSetToken
}) => {
  return <div
    style={styles}
  >
    Not logged in!
    <button
      onClick={loginAndSetToken}
    >Login</button>
  </div>
}

export const Loading = () => {
  return <div style={styles}>
    <div>Loading...</div>
  </div>
}

export function setBrowserToken(browserToken, token) {
  if(browserToken) window.localStorage.setItem(browserToken, token)
}

export function getBrowserToken(browserToken) {
  if(browserToken) return window.localStorage.getItem(browserToken)
  return null
}

export function loginAndSetToken({
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

export async function checkAuthAndSetState({
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
      loginAndSetToken={loginAndSetToken({
        login,
        setToken,
        browserToken
    })}></Unauthenticated>

  )
}

