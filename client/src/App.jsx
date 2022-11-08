import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignInComponent from "./components/signin/SignInComponent";
import SendResetMailComponent from "./components/passwordreset/SendResetMailComponent";
import "@fontsource/raleway";
import HomeComponent from "./components/home/HomeComponent";
import NewPassword from "./components/passwordreset/NewPasswordComponent";
import MainAdmin from "./components/admin/MainAdmin";
function App() {
  return (
    <Router>
      <div className="app">
        <header className="headerstyle">
        <img
          src="../../src/assets/cropped-DocebIT01-1-1.png"
          alt=""
          className="docebitlogo"
        />

        </header>
        


        <Routes>
          <Route path="/" element={<SignInComponent />} />
          <Route path="/reset" element={<SendResetMailComponent />} />
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/reset/:id" element={<NewPassword />} />
          <Route path="/admin" element={<MainAdmin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
