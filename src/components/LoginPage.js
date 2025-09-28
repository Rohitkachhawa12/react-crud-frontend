import React, { useState } from "react";
import Swal from "sweetalert2";
import "./css/LoginPage.css"; 
// import Header from "./Header"; 

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost/laravel-crud-api/public/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "✅ Login Successful",
          text: `Welcome back, ${data.user?.name || "User"}!`,
          timer: 2000,
          showConfirmButton: false,
        });

        localStorage.setItem("token", data.token);
        setFormData({ email: "", password: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: "❌ Login Failed",
          text: data.message || "Invalid credentials",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "⚠️ Server Error",
        text: "Please try again later.",
      });
    }
  };

  return (
    <>
      {/* Header included */}
      {/* <Header /> */}

      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="input-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
