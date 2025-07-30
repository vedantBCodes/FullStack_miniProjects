import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // 🔁 Import CSS
import '../App.css';

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/signup", 
        {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok===true) {
        toast.success("Signup successful!");
        setTimeout(() => navigate("/login"), 3000); // ⏳ Delay redirect
      } else {
        const errorText = await res.text();
        toast.error(`Signup failed:`);
      }
    } catch (err) {
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <div className='container'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder='Enter your name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /> <br /><br />

        <input
          type="email"
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /> <br /><br />

        <input
          type="password"
          placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /> <br /><br />

        <button type="submit">Submit</button>
      </form>

      <p style={{ color: 'blue' }}>Already have an account?</p>
      <NavLink to='/login'>Log In</NavLink>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SignUp;
