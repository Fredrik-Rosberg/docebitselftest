import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../admin/createAccount/createaccount.css";
import "./myaccount.css";
import { getCurrentUser } from "./myAccountService";
const MyAccount = () => {
  const [user, setUser] = useState({firstname:"", lastname:"", email:""});

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
      <form className="createaccountform">
        <div className="createaccountinput">
          <div></div>
          <h2 className="myaccount-header">Mitt konto</h2>
        </div>
        <div className="createaccountinput">
          <label htmlFor="firstname">Förnamn:</label>
          <input type="text" name="firstname" disabled value={user.firstname} />
        </div>
        <div className="createaccountinput">
          <label htmlFor="lastname">Efternamn:</label>
          <input type="text" name="lastname" disabled value={user.lastname} />
        </div>
        <div className="createaccountinput">
          <label htmlFor="email">E-postadress:</label>
          <input type="text" name="email" disabled value={user.email} />
        </div>
        <button className="createaccountbutton">
          <Link to="/admin">Ändra lösenord</Link>
        </button>
      </form>
    </>
  );
};

export default MyAccount;
