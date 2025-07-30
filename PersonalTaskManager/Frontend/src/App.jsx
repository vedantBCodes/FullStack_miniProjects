import './App.css'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Login from './Component/login'
import Signup from './Component/signup'
import Tasks from './Component/Tasks'
import Navbar from './Component/Navbar'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={ <Navbar/>}/>
        <Route path='/login' element={<> <Navbar/> <Login/> </>}/>
        <Route path='/signup' element={<> <Navbar/>  <Signup/> </>}/>
        <Route path='/tasks' element={<><Navbar/> <Tasks/></>}/>
      </Routes>
    </>
  )
}

export default App
