import React from "react";
import { Link } from "react-router-dom";
import "./css/Header.css";

function Header() {
  return (
    <header className="app-header">
      <div className="logo">🌐 MyApp</div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/about">About</Link>
      </nav>
      <div className="profile">
        <button className="profile-btn">👤 Profile</button>
      </div>
    </header>
  );
}

export default Header;
