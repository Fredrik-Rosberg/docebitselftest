import React from "react";
import "./SignInComponent.css";

function LoginPage() {

  

  return (
    <>
      <div className="signinmain">
        <img
          src="../../src/assets/cropped-DocebIT01-1-1.jpg"
          alt=""
          className="docebitlogo"
        />

        <form className="signinform">
          <h1 className="loginheader">Logga in på Docebit Selftest</h1>

          <div className="loginfield">
            <label htmlFor="username">E-post</label>
            <input type="email" />
          </div>

          <div className="loginfield">
            <label htmlFor="password">Lösenord</label>
            <input type="password" />
          </div>
          <div className="loginerrormessage">
            <p>Inloggning misslyckades</p>
            <p>Wrong password</p>
          </div>

          <button className="loginbutton">Logga in</button>
          <a href="kaoz.se" className="loginforgotpassword">
            Glömt lösenord?
          </a>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
