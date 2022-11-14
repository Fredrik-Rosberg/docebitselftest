import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./myAccount.css";
import { getCurrentUser } from "./myAccountService";
const MyAccount = () => {
  const [user, setUser] = useState({ firstname: "", lastname: "", email: "" });

  async function loadUser(userId) {
    let user = await getCurrentUser(userId);
    setUser(user);
  }

  useEffect(() => {
    let userId = localStorage.getItem("userId");
    if (userId) {
      loadUser(userId);
    }
  }, []);
  return (
    <>
        <div className="myaccountheader">
          <div></div>
          <h2>Mitt konto</h2>
        </div>
        <form className="myaccountform">
          <div className="myaccountinput">
            <label htmlFor="firstname">Förnamn:</label>
            <input
              type="text"
              name="firstname"
              disabled
              value={user.firstname}
            />
          </div>
          <div className="myaccountinput">
            <label htmlFor="lastname">Efternamn:</label>
            <input type="text" name="lastname" disabled value={user.lastname} />
          </div>
          <div className="myaccountinput">
            <label htmlFor="email">E-postadress:</label>
            <input type="text" name="email" disabled value={user.email} />
          </div>
          <div className="myaccountinput">
            <div></div>
            <button className="myaccountbutton">
              <Link to="/admin">Ändra lösenord</Link>
            </button>
          </div>
        </form>
    </>
  );
};

export default MyAccount;
