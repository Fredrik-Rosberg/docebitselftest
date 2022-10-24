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
          <h3 className="loginheader">Logga in på Docebit Selftest</h3>

          <div className="loginfield">
            <label htmlFor="username">E-post</label>
            <input type="email" />
          </div>

          <div className="loginfield">
            <label htmlFor="password">Lösenord</label>
            <input type="password" />
          </div>

          <button className="loginbutton">Logga in</button>
          <a className="loginforgotpassword">Glömt lösenord?</a>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
