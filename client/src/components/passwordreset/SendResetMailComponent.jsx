import "../signin/SignInComponent.css";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
function SendResetMail() {
  const [sent, setSent] = useState(false);

  return (
    <>
      {sent ? (
        <div className="signinform">
          <h2>Återställ lösenord</h2>
          <p className="resetpasswordtext">
            Du får inom kort ett mail med en återställningslänk skickad till din
            E-post. Vänligen klicka på länken och följ anvisningarna.
          </p>
          <div></div>
          <div></div>

          <Link to="/">
            <button className="signinbutton">Tillbaka</button>
          </Link>
        </div>
      ) : (
        <form onSubmit={(e) => setSent(true)} className="signinform">
          <h2>Återställ lösenord</h2>
          <p className="resetpasswordtext">
            Fyll i den e-postadress som är registrerad för ditt konto. Ett mail
            kommer att skickas med en länk för att återställa ditt lösenord
          </p>
          <div></div>
          <div className="signinfield moveup">
            <label className="labelspace">E-post</label>
            <input type="text"></input>
          </div>
          <button type="submit" className="signinbutton">
            Skicka
          </button>
        </form>
      )}
    </>
  );
}

export default SendResetMail;
