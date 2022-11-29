import "./createAccount.css";
import React, { useState, useEffect, useRef } from "react";
import { validateInputsCreateAccount } from "../../signIn/validation.service.js";
import { createAccount } from "./createAccount.service";

function CreateAccount() {
  const inputFirstNameEl = useRef(null);
  const inputLastNameEl = useRef(null);
  const inputEmailEl = useRef(null);
  const inputPasswordEl = useRef(null);

  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "user",
  });
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessages, setShowErrorMessages] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  useEffect(() => {
    const error = validateInputsCreateAccount(newUser);
    setErrorMessage(error);
    setShowErrorMessages(false);
  }, [newUser]);

  useEffect(() => {
    setNewUser({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      role: "user",
    });
    setShowMessages(true);
  }, [message]);

  const focusOnEmptyInputField = (inputEl) => {
    if (inputEl.current.value == "") {
      inputEl.current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowMessages(false);

    focusOnEmptyInputField(inputPasswordEl);
    focusOnEmptyInputField(inputEmailEl);
    focusOnEmptyInputField(inputLastNameEl);
    focusOnEmptyInputField(inputFirstNameEl);

    if (errorMessage == "") {
      let result = await createAccount(newUser);
      if (result.error) {
        setErrorMessage(result.error);
        setMessage("");
      } else {
        setMessage(result.message);
      }

      setShowMessages(true);
    }

    setShowErrorMessages(true);
  };

  return (
    <>
      <h2 className="h2-styled">Nytt konto</h2>

      <form onSubmit={handleSubmit} className="createaccountform">
        <div className="createaccountinput">
          <label htmlFor="firstname">Förnamn:</label>
          <input
            ref={inputFirstNameEl}
            type="text"
            name="firstname"
            value={newUser.firstname}
            onChange={(e) => {
              setNewUser({
                ...newUser,
                firstname: e.target.value.trim(),
              }),
                setMessage(""),
                () => validateInput();
            }}
          />
        </div>
        <div className="createaccountinput">
          <label htmlFor="lastname">Efternamn:</label>
          <input
            ref={inputLastNameEl}
            type="text"
            name="lastname"
            value={newUser.lastname}
            onChange={(e) => {
              setNewUser({
                ...newUser,
                lastname: e.target.value.trim(),
              }),
                setMessage(""),
                () => validateInput();
            }}
          />
        </div>
        <div className="createaccountinput">
          <label htmlFor="email">E-postadress:</label>
          <input
            ref={inputEmailEl}
            type="text"
            name="email"
            value={newUser.email}
            onChange={(e) => {
              setNewUser({
                ...newUser,
                email: e.target.value.trim().toLowerCase(),
              }),
                setMessage(""),
                () => validateInput();
            }}
          />
        </div>
        <div className="createaccountinput">
          <label htmlFor="password">Lösenord:</label>
          <input
            ref={inputPasswordEl}
            type="password"
            name="password"
            value={newUser.password}
            onChange={(e) => {
              setNewUser({ ...newUser, password: e.target.value.trim() }),
                setMessage(""),
                () => validateInput();
            }}
          />
        </div>
        <div className="createaccountinput">
          <label htmlFor="account">Konto:</label>
          <select
            className="create-account-select"
            value={newUser.role}
            onChange={(e) =>
              setNewUser({ ...newUser, role: e.target.value }, () =>
                validateInput()
              )
            }
          >
            <option className="create-account-option" value="user">
              Kursdeltagare
            </option>
            <option className="create-account-option" value="admin">
              Administratör
            </option>
          </select>
        </div>
        <button className="createaccountbutton">Skapa konto</button>
        <div className="create-account-messages">
          {showMessages && (
            <>
              <p className="createaccountmessage">{message}</p>
            </>
          )}
          {showErrorMessages && (
            <>
              <p className="createaccounterrormessage">{errorMessage}</p>
            </>
          )}
        </div>
      </form>
    </>
  );
}

export default CreateAccount;
