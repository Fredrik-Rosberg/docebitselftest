import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./navbarLayout.css";
import { GrDocumentText } from "react-icons/gr";

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
            <Link to="/admin/courseoccasion/create">
              <GrDocumentText />
              Översikt
            </Link>
            <Link to="/admin/account/create">
              <GrDocumentText />
              Konto
            </Link>
            <Link to="/admin/account/create">
              <GrDocumentText />
              Test
            </Link>
            <Link to="/admin/courseoccasion/create">
              <GrDocumentText />
              Kurstillfälle
            </Link>
            <Link to="/admin/account/users">
              <GrDocumentText />
              Kurs
            </Link>
            <Link to="/admin/account/create">
              <GrDocumentText />
              Mitt konto
            </Link>
            <Link to="/"className="navbar-signout">Logga ut</Link>
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
