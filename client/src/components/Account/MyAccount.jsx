import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserById } from "./MyAccount.service";
const MyAccount = () => {
  const [user, setUser] = useState({ firstname: "", lastname: "", email: "" });

  async function loadUser(userId) {
    let user = await getUserById(userId);
    setUser(user);
  }

  useEffect(() => {
    let userId = localStorage.getItem("user");
    if (userId) {
      loadUser(userId);
    }
  }, []);
  return (
    <>
        <h2 className="form-h2">Mitt konto</h2>
        <form className="form-container my-account-form">
          <div className="form-row-item">
            <label htmlFor="firstname">Förnamn:</label>
            <input
              type="text"
              name="firstname"
              disabled
              value={user.firstname}
            />
          </div>
          <div className="form-row-item">
            <label htmlFor="lastname">Efternamn:</label>
            <input type="text" name="lastname" disabled value={user.lastname} />
          </div>
          <div className="form-row-item">
            <label htmlFor="email">E-postadress:</label>
            <input type="text" name="email" disabled value={user.email} />
          </div>
          <Link className='form-link' to={`/admin/account/${user.id}/changepassword`}>
            <button className="form-button">Ändra lösenord</button>
          </Link>
        </form>
    </>
  );
};

export default MyAccount;
