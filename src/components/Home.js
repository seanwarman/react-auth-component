import React from 'react'
import background from '../pictures/success.gif'
import './Home.css'

window.thingy = background

const backgroundStyle = {
  background: `url(${background})`,
  backgroundSize: '151%',
  backgroundPosition: '-158px -52px'
}

const Home = ({ 
  logout, 
  store: { username }
}) => (

  <div id="home">
    <div className="success-wrapper">

      <div className="success"
        style={backgroundStyle}
      ></div>
      <div className="welcome-wrapper">
        <h1 className="username">
          Hi {username}!
        </h1>
        <button
          data-test="logout"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>

  </div>

)

export default Home
