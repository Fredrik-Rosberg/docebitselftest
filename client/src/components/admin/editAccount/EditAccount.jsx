import "./editAccount.css";
import React, { useState, useEffect } from "react";
import { validateInputsCreateAccount } from "../../signIn/validation.service.js";
import { editAccount } from "./editAccount.service";
import { useParams, Link } from "react-router-dom";
import { getUserById } from "../../Account/MyAccount.service";

function EditAccount() {
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
      <form onSubmit={handleSubmit} className="editaccountform">
        <div className="editaccountinput">
          <div></div>
          <h2>Ändra kontouppgifter</h2>
        </div>
        <div className="editaccountinput">
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
        <div className="editaccountinput">
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
        <div className="editaccountinput">
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
        <div className="editaccountinput">
          <label htmlFor="password">Lösenord:</label>
          <input
            type="password"
            name="password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value }), setMessage("");
            }}
          />
        </div>
        <div className="editaccountinput">
          <label htmlFor="account">Konto:</label>
          <select
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          >
            <option value="User">Kursdeltagare</option>
            <option value="admin">Administratör</option>
          </select>
        </div>
        <div className="editaccountinput">
          <div></div>
          <div className="editaccountbuttons">
            <button className="editaccountbutton">
              <Link to="/admin/overview">Tillbaka</Link>
            </button>

            <button className="editaccountbutton">Spara</button>
          </div>
        </div>
        <div>
          {showMessages ? (
            message == "" && validationMessage == "" ? (
              ""
            ) : (
              <>
                <p className="editaccountmessage">{message}</p>
                <p className="editaccountvalidationmessage">
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

export default EditAccount;

// Lagt till valideringsmeddelande för email o lösenord
// + meddelande för att konto skapats eller användare finns redan
// Om newUser.role är en tom sträng så sätts valideringsmeddelandet till vänligen fyll i alla uppgifter
// Tagit bort console log
