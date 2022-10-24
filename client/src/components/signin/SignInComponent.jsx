import "./SignInComponent.css";

import React, { useState, useEffect } from "react";
import { validateUserInputs } from "./validationService.js";
import { signIn } from "./signinService";

function LoginPage() {
  const initValue = "Default";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(initValue);
  const [errorEmail, setErrorEmail] = useState(initValue);
  const [showMessages, setShowMessages] = useState(false);

  //OnSubmit kollas så att det inte är några felmeddelanden pga användarens felaktiga inputs. Kör endast signIn om det är ifyllt rätt enligt kravspecen.
  useEffect(() => {
    const { emailError, passwordError } = validateUserInputs(email, password);
    setErrorPassword(passwordError);
    setErrorEmail(emailError);
    setShowMessages(false);
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errorEmail == "" && errorPassword == "") {
      const user = { email: email, password: password };
      let response = await signIn(user);
      console.log(response);
      if (response == "No matching user") {
        setErrorEmail(response);
      } else if (response == "Congrats you are logged in") {
        setErrorPassword(response);
      } else {
        setErrorPassword(response);
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
                setEmail(e.target.value), setErrorEmail(initValue);
              }}
              value={email}
            />
          </div>

          <div className="loginfield">
            <label htmlFor="password">Lösenord</label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value), setErrorPassword(initValue);
              }}
              value={password}
            />
          </div>
          <div className="loginerrormessage">
            {showMessages ? (
              errorPassword == initValue ? (
                ""
              ) : (
                <>
                  <p>Inloggning misslyckades</p>
                  <p>{errorEmail}</p>
                  <p>{errorPassword}</p>
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
