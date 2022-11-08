import "./createAccount.css";
import React from "react";

const CreateAccount = () => {
  const handleSubmit = () => {};
  return (
    <>
      <form onSubmit={handleSubmit} className="createaccountform">
        <div className="createaccountinput">
          <div></div>
          <h2>Nytt konto</h2>
        </div>
        <div className="createaccountinput">
          <label htmlFor="firstname">Förnamn:</label>
          <input type="text" name="firstname" />
        </div>
        <div className="createaccountinput">
          <label htmlFor="lastname">Efternamn:</label>
          <input type="text" name="email" />
        </div>
        <div className="createaccountinput">
          <label htmlFor="email">E-postadress:</label>
          <input type="text" name="email" />
        </div>
        <div className="createaccountinput">
          <label htmlFor="password">Lösenord:</label>
          <input type="password" name="password" />
        </div>
        <div className="createaccountinput">
          <label htmlFor="account">Konto:</label>
          <select size="2">
            <option>Kursdeltagare</option>
            <option>Administratör</option>
          </select>
        </div>
        <div className="createaccountinput">
          <div></div>

          <button className="createaccountbutton">Skapa konto</button>
        </div>
      </form>
    </>
  );
};

export default CreateAccount;
