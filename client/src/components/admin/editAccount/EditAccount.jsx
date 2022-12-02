import React, { useState, useEffect, useRef } from "react";
import { validateInputsCreateAccount } from "../../signIn/validation.service.js";
import { editAccount } from "./editAccount.service";
import { useParams, Link } from "react-router-dom";
import { getUserById } from "../../Account/MyAccount.service";
import { focusOnEmptyInputField } from "../../admin/createAccount/CreateAccount";

function EditAccount() {
  const inputPasswordEl = useRef(null);
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "user",
    id: useParams().id,
  });

  const [message, setMessage] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [showMessages, setShowMessages] = useState(false);

  async function getUser() {
    let currentUser = await getUserById(user.id);
    currentUser.password = "";
    setUser(currentUser);
  }
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const error = validateInputsCreateAccount(user);
    setValidationMessage(error);
    setShowMessages(false);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    focusOnEmptyInputField(inputPasswordEl);
    if (validationMessage == "") {
      let result = await editAccount(user);
      if (result == "Något gick fel") {
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
      <h2 className="form-h2">Ändra kontouppgifter</h2>
      <form className="form-container edit-account-form">
        <div className="form-row-item">
          <label htmlFor="firstname">Förnamn:</label>
          <input
            type="text"
            name="firstname"
            value={user.firstname}
            onChange={(e) => {
              setUser({ ...user, firstname: e.target.value }), setMessage("");
            }}
          />
        </div>
        <div className="form-row-item">
          <label htmlFor="lastname">Efternamn:</label>
          <input
            type="text"
            name="lastname"
            value={user.lastname}
            onChange={(e) => {
              setUser({ ...user, lastname: e.target.value }), setMessage("");
            }}
          />
        </div>
        <div className="form-row-item">
          <label htmlFor="email">E-postadress:</label>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value }), setMessage("");
            }}
          />
        </div>
        <div className="form-row-item">
          <label htmlFor="password">Lösenord:</label>
          <input
            ref={inputPasswordEl}
            type="password"
            name="password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value }), setMessage("");
            }}
          />
        </div>
        <div className="form-row-item">
          <label htmlFor="account">Konto:</label>
          <select
            className="form-select"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          >
            <option value="User">Kursdeltagare</option>
            <option value="admin">Administratör</option>
          </select>
        </div>
        <div className="form-buttons-container">
          <Link className="form-link" to="/admin/">
            <button className="form-button">Tillbaka</button>
          </Link>
          <button className="form-button" onClick={handleSubmit}>
            Spara
          </button>
        </div>
        <div className="messages">
          {showMessages && (
            <>
              <p className="success-message">{message}</p>
              <p className="error-message">{validationMessage}</p>
            </>
          )}
        </div>
      </form>
    </>
  );
}

export default EditAccount;