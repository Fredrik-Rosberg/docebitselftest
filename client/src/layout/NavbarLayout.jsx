import React from "react";
import { Outlet, Link, Navigate } from "react-router-dom";
import "./navbarLayout.css";
import { GrDocumentText } from "react-icons/gr";
import ModalComponent from "../components/modal/ModalComponent";
import { useState } from "react";

const NavbarLayout = () => {
  const [openModal, setOpenModal] = useState(false);

  function handleSignOut() {
    console.log("träff");
    req.session.destroy();
  }

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
            <Link to="/admin/myaccount">
              <GrDocumentText />
              Mitt nya 
            </Link>

            <button onClick={() => setOpenModal(true)}>logga ut</button>
          </div>
        </div>
        <div className="navbar-body">
          <Outlet />
        </div>
      </div>
      <ModalComponent
        content="Är du säker på att du vill logga ut?"
        onClose={() => setOpenModal(!openModal)}
        show={openModal}
        signOut={handleSignOut}
      ></ModalComponent>
    </>
  );
};

export default NavbarLayout;
