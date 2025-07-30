import { useState } from 'react'
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import './App.css'

function App() {
  const [isLogin, setIsLogin]= useState(false);

  return (
    <>
     {isLogin ? <Login setIsLogin={setIsLogin}/> : <SignUp setIsLogin={setIsLogin}/>}
    </>
  )
}

export default App
