import "./createAccount.css";
import React, { useState, useEffect } from "react";
import { validateInputsCreateAccount } from "../../signIn/validation.service.js";
import { createAccount } from "./createAccount.service";

function CreateAccount() {
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "user",
  });
  const [message, setMessage] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [showMessages, setShowMessages] = useState(false);

  useEffect(() => {
    const error = validateInputsCreateAccount(newUser);
    setValidationMessage(error);
    setShowMessages(false);
  }, [
    newUser.email,
    newUser.password,
    newUser.role,
    newUser.firstname,
    newUser.lastname,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validationMessage == "") {
      let result = await createAccount(newUser);
      console.log(result);
      if (result == "Användare finns redan") {
        setValidationMessage(result);
        setMessage("");
      } else {
        setMessage(result);
      }
    }
    setShowMessages(true);
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
              setNewUser({ ...newUser, firstname: e.target.value }),
                setMessage("");
            }}
          />
        </div>
        <div className="createaccountinput">
          <label htmlFor="lastname">Efternamn:</label>
          <input
            type="text"
            name="lastname"
            onChange={(e) => {
              setNewUser({ ...newUser, lastname: e.target.value }),
                setMessage("");
            }}
          />
        </div>
        <div className="createaccountinput">
          <label htmlFor="email">E-postadress:</label>
          <input
            type="text"
            name="email"
            onChange={(e) => {
              setNewUser({ ...newUser, email: e.target.value }), setMessage("");
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
                setMessage("");
            }}
          />
        </div>
        <div className="createaccountinput">
          <label htmlFor="account">Konto:</label>
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="user">Kursdeltagare</option>
            <option value="admin">Administratör</option>
          </select>
        </div>
        <div className="createaccountinput">
          <div></div>

          <button className="createaccountbutton">Skapa konto</button>
        </div>
        <div>
          {showMessages ? (
            message == "" && validationMessage == "" ? (
              ""
            ) : (
              <>
                <p className="createaccountmessage">{message}</p>
                <p className="createaccountvalidationmessage">
                  {validationMessage}
                </p>
              </>
            )
          ) : (
            ""
          )}
        </div>
      </form>
    </>
  );
}

export default CreateAccount;

// Lagt till valideringsmeddelande för email o lösenord
// + meddelande för att konto skapats eller användare finns redan
// Om newUser.role är en tom sträng så sätts valideringsmeddelandet till vänligen fyll i alla uppgifter
// Tagit bort console log
