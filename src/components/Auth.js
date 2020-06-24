import React, { useEffect, useState } from 'react'

export const Loading = ({ loadingStyles }) => {
  return <div style={loadingStyles}>
    <div>Loading...</div>
  </div>
}

function setLocalStore(tokenLabel, data) {
  if(tokenLabel) window.localStorage.setItem(tokenLabel, JSON.stringify(data))
}

export function getLocalStore(tokenLabel) {
  if(!tokenLabel) return {}

  let store

  try {
    store = JSON.parse(window.localStorage.getItem(tokenLabel))
  } catch (err) {
    return {}
  }

  if(!store) return {}

  return store
}

function removeLocalStore(tokenLabel) {
  if(tokenLabel) window.localStorage.removeItem(tokenLabel)
}

function logout({
  setStore,
  setAuthenticated,
  tokenLabel
}) {
  return function() {
    removeLocalStore(tokenLabel)
    setStore({})
    setAuthenticated(false)
  }
}

export function loginAndSetToken({
  login,
  setStore,
  setUser,
  tokenLabel
}) {

  return async function(data) {
    const token = await login(data)

    if(typeof token !== 'string') {
      removeLocalStore(tokenLabel)
      setStore({})
    }

    // TODO: this needs to be abstracted, add a localStoreKeys prop to Auth
    // so we can choose from there which params to save to 'store'
    setLocalStore(tokenLabel, { token, username: data.username })
    setStore({token, username: data.username})

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
  const [store, setStore] = useState(getLocalStore(tokenLabel))

  useEffect(() => {

    checkAuthAndSetState({
      setLoading,
      setAuthenticated,
      checkAuth,
      token: store.token
    })

  }, [store, checkAuth])

  return (

    loadingState && renderLoading ?
    renderLoading()
    :
    loadingState && !renderLoading ?
    <Loading styles={setLoadingStyles(loadingStyles)} />
    :
    authenticatedState ?
    React.Children.map(children, child => 
      React.cloneElement(child, { store, logout: logout({
        setAuthenticated,
        setStore,
        tokenLabel
      })})
    )
    :
    renderUnauthenticated(
      loginAndSetToken({
        login, 
        setStore, 
        tokenLabel
      })
    )

  )
}

