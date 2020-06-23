import React, { useEffect, useState } from 'react'

const Loading = ({ loadingStyles }) => {
  return <div style={loadingStyles}>
    <div>Loading...</div>
  </div>
}

function setBrowserToken(tokenLabel, token) {
  if(tokenLabel) window.localStorage.setItem(tokenLabel, token)
}

function getBrowserToken(tokenLabel) {
  if(tokenLabel) return window.localStorage.getItem(tokenLabel)
  return null
}

function removeBrowserToken(tokenLabel) {
  if(tokenLabel) window.localStorage.removeItem(tokenLabel)
}

function logout({
  setToken,
  setAuthenticated,
  tokenLabel
}) {
  return function() {
    removeBrowserToken(tokenLabel)
    setToken(undefined)
    setAuthenticated(false)
  }
}

function loginAndSetToken({
  login,
  setToken,
  tokenLabel
}) {

  return async function(data) {
    const token = await login(data)

    if(typeof token !== 'string') {
      setBrowserToken(tokenLabel, null)
      setToken(null)
    }

    setBrowserToken(tokenLabel, token)
    setToken(token)

    return token
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

function setLoadingStyles(
  loadingStyles = {}
) {
  return {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...loadingStyles
  }
}

export default function Auth({
  checkAuth,
  children,
  renderUnauthenticated,
  renderLoading,
  login,
  tokenLabel,
  loadingStyles
}) {

  const [loadingState, setLoading] = useState(true)
  const [authenticatedState, setAuthenticated] = useState(false)
  const [token, setToken] = useState(getBrowserToken(tokenLabel))

  useEffect(() => {

    checkAuthAndSetState({
      setLoading,
      setAuthenticated,
      checkAuth,
      token
    })

  }, [token, checkAuth])

  return (

    loadingState && renderLoading ?
    renderLoading()
    :
    loadingState && !renderLoading ?
    <Loading styles={setLoadingStyles(loadingStyles)} />
    :
    authenticatedState ?
    React.Children.map(children, child => 
      React.cloneElement(child, { logout: logout({
        setAuthenticated,
        setToken,
        tokenLabel
      })})
    )
    :
    renderUnauthenticated(
      loginAndSetToken({
        login, 
        setToken, 
        tokenLabel
      })
    )

  )
}

