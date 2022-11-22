import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./navbarLayout.css";
import { GrDocumentText } from "react-icons/gr";
import ModalComponent from "../components/modal/Modal";
import { useState } from "react";
import { signOut } from "../components/signIn/signin.service";

const NavbarLayoutUser = () => {
  const [openModal, setOpenModal] = useState(false);
  let navigate = useNavigate(false);

  async function handleSignOut() {
    localStorage.clear();

    let response = await signOut();
    if (response.signedOut) {
      navigate("/");
    } else {
      ("wft");
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
            <Link className="navbar-link" to="/user/test">
              <GrDocumentText />
              Översikt
            </Link>
            <Link className="navbar-link" to="/user/test">
              <GrDocumentText />
              Övningstest
            </Link>
            <Link className="navbar-link" to="/user/myaccount">
              <GrDocumentText />
              Mitt konto
            </Link>
            
          </div>
          <button className="navbar-signout" onClick={() => setOpenModal(true)}>
            Logga ut
          </button>
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

export default NavbarLayoutUser;
