import React from 'react'
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <>
    <h1>User Authentication System</h1>
    <NavLink to='/signup'>Start</NavLink>
    </>
  )
}

export default Home