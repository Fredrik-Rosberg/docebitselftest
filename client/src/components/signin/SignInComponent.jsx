import "./SignInComponent.css";

import React, { useState, useEffect } from "react";
import { validateUserInputs } from "./validationService.js";
import { signIn } from "./signinService";

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
      <div className="signinmain">
        <img
          src="../../src/assets/cropped-DocebIT01-1-1.jpg"
          alt=""
          className="docebitlogo"
        />

        <form className="signinform" onSubmit={handleSubmit}>
          <h1 className="loginheader">Logga in på Docebit Selftest</h1>

          <div className="loginfield">
            <label htmlFor="username">E-post</label>
            <input
              type="text"
              onChange={(e) => {
                setEmail(e.target.value), setErrorMessage("");
              }}
              value={email}
            />
          </div>

          <div className="loginfield">
            <label htmlFor="password">Lösenord</label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value), setErrorMessage("");
              }}
              value={password}
            />
          </div>
          <div className="loginerrormessage">
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

          <button className="loginbutton">Logga in</button>
          <a href="" className="loginforgotpassword">
            Glömt lösenord?
          </a>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
