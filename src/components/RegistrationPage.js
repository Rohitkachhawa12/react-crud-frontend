import React, { useState } from "react";
import "./css/RegistrationPage.css";
// import Header from "./Header";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css"; // 👈 important

function RegistrationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to register with these details?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Register",
        cancelButtonText: "Cancel",
      });

      if (confirmResult.isConfirmed) {
        try {
          const response = await fetch(
            "http://localhost/laravel-crud-api/public/api/users",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                full_name: formData.name,
                email: formData.email,
                password: formData.password,
              }),
            }
          );

          const data = await response.json();
          console.log("API Response:", data);

          if (response.ok) {
            Swal.fire({
              icon: "success",
              title: "🎉 Registration Successful!",
              showConfirmButton: false,
              timer: 2000,
            });
            setFormData({ name: "", email: "", password: "" });
          } else {
            Swal.fire({
              icon: "error",
              title: "⚠️ Registration Failed",
              text: data.message || "Unknown error",
            });
          }
        } catch (error) {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "🚨 Something went wrong!",
            text: "Please try again later.",
          });
        }
      }
    }
  };

  return (
    <>
      {/* 👇 Header har page ke top pe show hoga */}
      {/* <Header /> */}

      <div className="registration-container">
        <div className="registration-card">
          <h2 className="registration-title">Registration Page</h2>
          <form onSubmit={handleSubmit} className="registration-form">
            {/* Name */}
            <div className="input-group">
              <label className="input-label">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your name"
              />
              {errors.name && <p className="input-error">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="input-group">
              <label className="input-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your email"
              />
              {errors.email && <p className="input-error">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="input-group">
              <label className="input-label">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your password"
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
              {errors.password && (
                <p className="input-error">{errors.password}</p>
              )}
            </div>

            <button type="submit" className="submit-btn">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegistrationPage;
