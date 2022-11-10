import React from "react";
import { Outlet } from "react-router-dom";
import './mainLayout.css'
const MainLayout = () => {
  return (
    <div className="app">
      <header className="headerstyle">
        <img
          src="../../src/assets/cropped-DocebIT01-1-1.png"
          alt=""
          className="docebitlogo"
        />
      </header>
      <Outlet/>
    </div>
  );
};

export default MainLayout;
