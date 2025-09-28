import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="app-header">
      <div className="logo">🌐 MyApp</div>
      <nav className="nav-links">
        <a href="/">Home</a>
        <a href="/register">Register</a>
        <a href="/login">Login</a>
        <a href="/about">About</a>
      </nav>
      <div className="profile">
        <button className="profile-btn">👤 Profile</button>
      </div>
    </header>
  );
}

export default Header;
