import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignInComponent from "./components/signin/SignInComponent";
import SendResetMailComponent from "./components/passwordreset/SendResetMailComponent";
import "@fontsource/raleway";
import HomeComponent from "./components/home/HomeComponent"
import NewPassword from "./components/passwordreset/NewPasswordComponent";
function App() {
  const [count, setCount] = useState(0);

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
          <Route path="/newpassword" element={<NewPassword />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
