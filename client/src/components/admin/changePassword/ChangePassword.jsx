import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./changePassword.css";
import { changePassword, checkCurrentPassword } from "./changePassword.service";
import { validatePassword } from "../../signIn/validation.service";

function ChangePassword() {
  const [success, setSuccess] = useState(false);
  const [passwordOne, setPasswordOne] = useState();
  const [passwordTwo, setPasswordTwo] = useState();
  const [currentPassword, setCurrentPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [showMessage, setShowMessage] = useState(false);

  const params = useParams();

  useEffect(() => {
    if (passwordOne == passwordTwo) {
      const error = validatePassword(passwordOne);
      if (error == "") {
        setErrorMessage("success");
      } else {
        setErrorMessage("Kontrollera att lösenordet uppfyller kraven");
      }
    } else {
      setErrorMessage("Kontrollera att lösenorden är lika");
    }
    setShowMessage(false);
  }, [passwordOne, passwordTwo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let checkedPassword = await checkCurrentPassword(
      currentPassword,
      params.id
    );

    if (errorMessage == "success" && checkedPassword) {
      setSuccess(true);
      let resp = await changePassword(passwordOne, params.id);
      console.log(resp.result);
    } else if (errorMessage == "success" && !checkedPassword) {
      setErrorMessage("Kontrollera ditt nuvarande lösenord");
      setShowMessage(true);
    } else {
      setShowMessage(true);
    }
  };

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
        <form className="changepasswordform" onSubmit={handleSubmit}>
          <h2 className="changepasswordheader">
            <div></div> Ändra lösenord
          </h2>

          <div className="changepasswordinput">
            <label htmlFor="password" className="labelspace">
              Nuvarande lösenord:
            </label>
            <input
              type="password"
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
            />
          </div>

          <div className="changepasswordinput">
            <label htmlFor="password" className="labelspace">
              Nytt lösenord:
            </label>
            <input
              type="password"
              onChange={(e) => {
                setPasswordOne(e.target.value);
              }}
            />
          </div>

          <div className="changepasswordinput">
            <label htmlFor="confirmpassword" className="labelspace">
              Upprepa nytt lösenord:
            </label>
            <input
              type="password"
              onChange={(e) => {
                setPasswordTwo(e.target.value);
              }}
            />
          </div>
          <div></div>
          <div className="changepasswordbuttoncontainer">
            <div></div>
            <div>
              <Link to="/admin/myaccount">
                <button type="button" className="changepasswordbutton">
                  Tillbaka
                </button>
              </Link>
              <button type="submit" className="changepasswordbutton">
                Spara
              </button>
            </div>
          </div>
          {showMessage ? (
            <p className="signinerrormessage">{errorMessage}</p>
          ) : (
            ""
          )}
        </form>
      )}
    </>
  );
}

export default ChangePassword;
