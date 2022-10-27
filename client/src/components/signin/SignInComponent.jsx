import "./SignInComponent.css";

import React, { useState, useEffect } from "react";
import { validateUserInputs } from "./validationService.js";
import { signIn } from "./signinService";
import {Link} from "react-router-dom"

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showMessages, setShowMessages] = useState(false);

  //OnSubmit kollas så att det inte är några felmeddelanden pga användarens felaktiga inputs. Kör endast signIn om det är ifyllt rätt enligt kravspecen.

  useEffect(() => {
    const error = validateUserInputs(email, password);
    setErrorMessage(error);
    setShowMessages(false);
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errorMessage == "") {
      const user = { email: email, password: password };
      let response = await signIn(user);
      if (response == "No matching user") {
        setErrorMessage("Kontrollera att du angivit rätt E-post och lösenord");
      }
    }
    setShowMessages(true);
  };

  return (
    <>
      
        <form className="signinform" onSubmit={handleSubmit}>
          <h1 className="signinheader">Logga in på Docebit Selftest</h1>

          <div className="signinfield labelspace">
            <label htmlFor="username" className="labelspace" >E-post</label>
            <input
              type="text"
              onChange={(e) => {
                setEmail(e.target.value), setErrorMessage("");
              }}
              value={email}
              
            />
          </div>

          <div className="signinfield">
            <label htmlFor="password" className="labelspace">Lösenord</label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value), setErrorMessage("");
              }}
              value={password}
            />
          </div>
          <div className="signinerrormessage">
            {showMessages ? (
              errorMessage == "" ? (
                ""
              ) : (
                <>
                  <p>Inloggning misslyckades</p>
                  <p>{errorMessage}</p>
                </>
              )
            ) : (
              ""
            )}
          </div>

          <button className="signinbutton">Logga in</button>
          <Link to="/reset"className="signinforgotpassword">
            Glömt lösenord?
          </Link>
        </form>
      
    </>
  );
}

export default SignIn;
