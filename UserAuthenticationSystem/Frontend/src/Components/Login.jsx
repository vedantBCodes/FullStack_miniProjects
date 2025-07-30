import React from 'react'
import '../app.css'
const Login = ({setIsLogin}) => {
    function changeLoginStatus()
    {
        setIsLogin(false);
    }
  return (
    <>
    <div className='container'>
    <h1>Log In</h1>
    <form action="localhost:3000/login" method='get'>
        <input type="email" placeholder='Enter your Gmail :'  name='email' /> <br /> <br />
         <input type="password" placeholder='Enter Password :'  name='password' />  <br /> <br />
         <button>Submit</button>
    </form>
    <p style={{color:'blue'}}>Don't have an account .</p>
    <button style={{padding:'5px 10px'}} onClick={changeLoginStatus}>SignIn</button>
    </div>
    </>
  )
}

export default Login