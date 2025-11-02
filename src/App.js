import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import UserList  from "./components/user_list";
import LoginPage from "./components/LoginPage";
import AboutPage from "./components/AboutPage";
import RegistrationPage from "./components/RegistrationPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Registration" element={<RegistrationPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/User-List" element={<UserList  />} />
      </Routes>
    </Router>
  );
}

export default App;
