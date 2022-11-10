import React from "react";
import { Outlet, Link } from "react-router-dom";
import './navbarLayout.css'

const NavbarLayout = () => {
  return (
    <>
      <div className="main-navbar">
        <div className="navbar">
          <img
            src="../../src/assets/cropped-DocebIT01-1-1.png"
            alt=""
            className="navbar-logo"
          />
          <div className="navbar-links">
            <Link to="/admin/courseoccasion/create">Kurstillfälle</Link>
            <Link to="/admin/account/create">Konto</Link>
          </div>
          <div>
            <Link to="/">Logga ut</Link>
          </div>
        </div>
        <div className="navbar-body">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default NavbarLayout;
