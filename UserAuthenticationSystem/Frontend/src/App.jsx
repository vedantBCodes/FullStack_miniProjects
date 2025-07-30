import SignUp from './Components/SignUp'
import Login from './Components/Login'
import Home from './Components/Home';
import { Routes, Route } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </>
  )
}

export default App
