import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./navbarLayout.css";
import { GrDocumentText } from "react-icons/gr";
import ModalComponent from "../components/modal/ModalComponent";
import { useState } from "react";
import { signOut } from "../components/signin/signinService";

const NavbarLayout = () => {
  const [openModal, setOpenModal] = useState(false);
  let navigate = useNavigate(false);

  async function  handleSignOut() {
    localStorage.clear();
    let response=await signOut();
     if (response.signedOut) {
       navigate("/");
     }
     else{
      "wft"
     }
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
              Mitt konto
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
