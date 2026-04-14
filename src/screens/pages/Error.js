import React from 'react'
import { NavLink } from 'react-router-dom'

const Error = () => {
  return (
    <div className="hero-area hero-area-lg position-relative col-12 text-center">
      <div>
        <h2 style={{fontSize: "10rem"}}>404</h2>
        <h3 style={{fontSize: "4.2rem"}}>UH OH! You're lost.</h3>
        <p style={{margin: "2rem 0"}}>
            The page you are looking for does not exist. How you got here is a
            mystery. But you can click the button below to go back to the
            homepage.
          </p>
          <NavLink to="/" className="btn btn-outline-primary">Go Back to Home</NavLink>
      </div>
    </div>
  )
}

export default Error