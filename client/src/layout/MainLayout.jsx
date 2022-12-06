import React from "react";
import { Outlet } from "react-router-dom";
import './mainLayout.css'
const MainLayout = () => {
  return (
    <div className="app">
      <div></div>
      <Outlet/>
    </div>
  );
};

export default MainLayout;
