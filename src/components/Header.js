import React from "react";
import { Link } from "react-router-dom";
import "./css/Header.css";
import "sweetalert2/dist/sweetalert2.min.css"; 

function Header() {
  return (
    <header className="app-header">
      <div className="logo">🌐 MyApp</div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/Registration">Register</Link>
        <Link to="/Login">Login</Link>
        <Link to="/about">About</Link>
      </nav>
      <div className="profile">
        <button className="profile-btn">👤 Profile</button>
      </div>
    </header>
  );
}

export default Header;
