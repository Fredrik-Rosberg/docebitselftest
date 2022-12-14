import React, { useState, useEffect, useRef } from "react";
import { validateInputsCreateAccount } from "../../signIn/validation.service.js";
import { createAccount } from "./createAccount.service";
export const focusOnEmptyInputField = (inputEl) => {
  if (inputEl.current.value == "") {
    inputEl.current.focus();
  }
};
export const focusOnWrongInput = (inputEl) => {
  if (!new RegExp(/^[A-Öa-ö\s]*$/).test(inputEl.current.value.trim())) {
    inputEl.current.focus();
  }
};
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowMessages(false);

    focusOnEmptyInputField(inputPasswordEl);
    focusOnEmptyInputField(inputEmailEl);
    focusOnEmptyInputField(inputLastNameEl);
    focusOnEmptyInputField(inputFirstNameEl);
    if (errorMessage != "") {
      focusOnWrongInput(inputLastNameEl);
      focusOnWrongInput(inputFirstNameEl);
    }
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
      <h2 className="form-h2">Nytt konto</h2>

      <form
        onSubmit={handleSubmit}
        className="form-container create-account-form "
      >
        <div className="form-row-item">
          <label htmlFor="firstname">Förnamn:</label>
          <input
            ref={inputFirstNameEl}
            type="text"
            name="firstname"
            value={newUser.firstname}
            onChange={(e) => {
              setNewUser({
                ...newUser,
                firstname: e.target.value,
              }),
                setMessage(""),
                () => validateInput();
            }}
          />
        </div>
        <div className="form-row-item">
          <label htmlFor="lastname">Efternamn:</label>
          <input
            ref={inputLastNameEl}
            type="text"
            name="lastname"
            value={newUser.lastname}
            onChange={(e) => {
              setNewUser({
                ...newUser,
                lastname: e.target.value,
              }),
                setMessage(""),
                () => validateInput();
            }}
          />
        </div>
        <div className="form-row-item">
          <label htmlFor="email">E-postadress:</label>
          <input
            ref={inputEmailEl}
            type="text"
            name="email"
            value={newUser.email}
            onChange={(e) => {
              setNewUser({
                ...newUser,
                email: e.target.value,
              }),
                setMessage(""),
                () => validateInput();
            }}
          />
        </div>
        <div className="form-row-item">
          <label htmlFor="password">Lösenord:</label>
          <input
            ref={inputPasswordEl}
            type="password"
            name="password"
            value={newUser.password}
            onChange={(e) => {
              setNewUser({ ...newUser, password: e.target.value }),
                setMessage(""),
                () => validateInput();
            }}
          />
        </div>
        <div className="form-row-item">
          <label htmlFor="account">Konto:</label>
          <select
            className="form-select"
            value={newUser.role}
            onChange={(e) =>
              setNewUser({ ...newUser, role: e.target.value }, () =>
                validateInput()
              )
            }
          >
            <option value="user">Kursdeltagare</option>
            <option value="admin">Administratör</option>
          </select>
        </div>
        <button className="form-button">Skapa konto</button>
        <div className="messages">
          {showMessages && (
            <>
              <p className="success-message">{message}</p>
            </>
          )}
          {showErrorMessages && (
            <>
              <p className="error-message">{errorMessage}</p>
            </>
          )}
        </div>
      </form>
    </>
  );
}

export default CreateAccount;
