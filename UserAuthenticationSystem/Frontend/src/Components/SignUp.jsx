import React from 'react'

const SignUp = ({setIsLogin}) => {
    function changeLoginStatus()
    {
        setIsLogin(true);
    }
  return (
    <>
    <div className='container'>
    <h1>Sign Up</h1>
    <form action="localhost:3000/signin" method='post'>
        <input type="text" placeholder='Enter your name :' name='name'/> <br /> <br />
        <input type="email" placeholder='Enter your Gmial :' name='email' /> <br /> <br />
         <input type="password" placeholder='Enter Password :' name='password' />  <br /> <br />
         <button>Submit</button>
    </form>
    <p style={{color:'blue'}}>Already have an account .</p>
    <button style={{padding:'5px 10px'}} onClick={changeLoginStatus}>LogIn</button>
    </div>
    </>
  )
}

export default SignUp