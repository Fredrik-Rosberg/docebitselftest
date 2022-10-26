import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../signin/SignInComponent.css";

function NewPassword() {
  const [success, setSuccess] = useState(false);

  return (
    <>
      {success ? (
        <div className="signinform">
          <div></div>
          <p>Ditt lösenord är nu ändrat</p>
          <Link to="/">
            <button className="signinbutton">Logga in</button>
          </Link>
        </div>
      ) : (
        <form className="signinform">
          <h1 className="signinheader">Skapa nytt lösenord</h1>
          <p className="resetpasswordtext">
            Ditt lösenord ska innehålla minst 8 tecken, innehålla versaler,
            minst en siffra och ett specialtecken.
          </p>
          <div></div>

          <div className="signinfield labelspace">
            <label htmlFor="password" className="labelspace">
              Fyll i ditt nya lösenord
            </label>
            <input type="password" />
          </div>

          <div className="signinfield">
            <label htmlFor="confirmpassword" className="labelspace">
              Upprepa lösenord
            </label>
            <input type="password" />
          </div>

          <button className="signinbutton">Återställ</button>
        </form>
      )}
    </>
  );
}

export default NewPassword;
