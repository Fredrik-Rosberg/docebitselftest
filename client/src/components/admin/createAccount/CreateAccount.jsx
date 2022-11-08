import "./createAccount.css";
import React, { useState, useEffect } from "react";
import { validateUserInputs } from "../../signin/validationService.js";
import { createAccount } from "./createAccountService";

function CreateAccount() {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showMessages, setShowMessages] = useState(false);

  useEffect(() => {
    const error = validateUserInputs(newUser.email, newUser.password);
    setErrorMessage(error);
    setShowMessages(false);
  }, [newUser.email, newUser.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await createAccount(newUser);
    console.log(result);
  };
  
  return (
    <>
      <form onSubmit={handleSubmit} className="createaccountform">
        <div className="createaccountinput">
          <div></div>
          <h2>Nytt konto</h2>
        </div>
        <div className="createaccountinput">
          <label htmlFor="firstname">Förnamn:</label>
          <input
            type="text"
            name="firstname"
            onChange={(e) => {
              setNewUser({ ...newUser, firstName: e.target.value }),
                setErrorMessage("");
            }}
          />
        </div>
        <div className="createaccountinput">
          <label htmlFor="lastname">Efternamn:</label>
          <input
            type="text"
            name="lastname"
            onChange={(e) => {
              setNewUser({ ...newUser, lastName: e.target.value }),
                setErrorMessage("");
            }}
          />
        </div>
        <div className="createaccountinput">
          <label htmlFor="email">E-postadress:</label>
          <input
            type="text"
            name="email"
            onChange={(e) => {
              setNewUser({ ...newUser, email: e.target.value }),
                setErrorMessage("");
            }}
          />
        </div>
        <div className="createaccountinput">
          <label htmlFor="password">Lösenord:</label>
          <input
            type="password"
            name="password"
            onChange={(e) => {
              setNewUser({ ...newUser, password: e.target.value }),
                setErrorMessage("");
            }}
          />
        </div>
        <div className="createaccountinput">
          <label htmlFor="account">Konto:</label>
          <select size="2">
            <option
              onClick={(e) => {
                setNewUser({ ...newUser, role: e.target.value });
              }}
              value="user"
            >
              Kursdeltagare
            </option>
            <option
              onClick={(e) => {
                setNewUser({ ...newUser, role: e.target.value });
              }}
              value="admin"
            >
              Administratör
            </option>
          </select>
        </div>
        <div className="createaccountinput">
          <div></div>

          <button className="createaccountbutton">Skapa konto</button>
        </div>
      </form>
    </>
  );
}

export default CreateAccount;
