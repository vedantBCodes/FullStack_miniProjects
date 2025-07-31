import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../app.css";

const Login = () => {
  const navigate = useNavigate(); // ✅ Add this
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(" http://localhost:3000/login ", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        
        if (data.token) {
          localStorage.setItem("token", data.token);
          toast.success("Login successful!");
        } else {
          alert(data.message);
        }

        setTimeout(() => navigate("/"), 3000); // ✅ Redirect to home or dashboard
      } else {
        const errorText = await res.text();
        toast.error(`Login failed: ${errorText}`);
      }
    } catch (err) {
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <>
      <div className="container">
        <h1>Log In</h1>
        <form onSubmit={handleLogIn}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />{" "}
          <br />
          <br />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />{" "}
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>

        <p style={{ color: "blue" }}>Don't have an account?</p>
        <NavLink to="/signup">Sign Up</NavLink>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
};

export default Login;
