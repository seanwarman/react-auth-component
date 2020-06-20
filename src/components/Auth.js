import React, { PureComponent } from 'react'

const styles = {
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const Unauthenticated = () => {
  return <div
    style={styles}
  >Not logged in!</div>
}

const Loading = () => {
  return <div style={styles}>
    <div>Loading...</div>
  </div>
}

export default class Auth extends PureComponent {
  state = {
    user: null,
    loading: true,
    authenticated: false
  }


  render() {
    return (

      this.state.loading && this.props.loading ?
      this.props.loading()
      :
      this.state.loading && !this.props.loading ?
      <Loading />
      :
      this.state.authenticated ?
      this.props.children
      :
      this.props.unauthenticated ?
      this.props.unauthenticated()
      :
      <Unauthenticated />

    )
  }
}

