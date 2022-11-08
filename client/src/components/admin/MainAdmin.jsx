import "./mainAdmin.css";
import React from "react";
import CreateAccount from "./createAccount/CreateAccount";
import { AiOutlineProfile } from "react-icons/ai";
import "../../assets/cropped-DocebIT01-1-1.jpg";

function MainAdmin() {
  return (
    <>
      <div className="adminmain">
        <div className="adminleftmain">
          <div className="adminlogo">Plats för logo</div>
          <div className="menublock">
            <div className="adminitem">
              <div>
                <AiOutlineProfile />
              </div>
              <div> Test</div>
            </div>
            <div className="adminitem">
              <div>
                <AiOutlineProfile />
              </div>
              <div>Test 2</div>
            </div>
            <div className="adminitem">
              <div>
                <AiOutlineProfile />
              </div>
              <div>Test 3</div>
            </div>
          </div>
        </div>
        <main className="adminrightmain">
          <CreateAccount />
        </main>
      </div>
    </>
  );
}

export default MainAdmin;
