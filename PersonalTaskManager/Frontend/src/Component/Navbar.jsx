import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css"; // Optional for styling
import { useState } from "react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!", {
      position: "top-center",
      autoClose: 1500,
    });
    setTimeout(() => {
      window.location.href = "/login";
    }, 1600);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUsername(decoded.userName);
      console.log("User ID:", decoded.userId);
      console.log("User Name:", decoded.userName);
    }
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/tasks" className="nav-link">
        Tasks
      </NavLink>
      {isLoggedIn == false ? (
        <NavLink to="/signup" className="nav-link">
          Sign Up
        </NavLink>
      ) : (
        <>
          <h2 style={{ color: "white" }}>Welcome {username}</h2>
          <NavLink onClick={logout} className="nav-link">
            LogOut
          </NavLink>
        </>
      )}

      {/* <NavLink to="/signup" className="nav-link">
        Sign Up
      </NavLink> */}
    </nav>
  );
};

export default Navbar;
