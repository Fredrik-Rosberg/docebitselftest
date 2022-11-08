import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import "../signin/SignInComponent.css";
import { validatePassword } from "../signin/validationService.js";
import { getExpireDate, updatePassword } from "./sendResetMailService";

function NewPassword() {
  const [success, setSuccess] = useState(false);
  const [passwordOne, setPasswordOne] = useState();
  const [passwordTwo, setPasswordTwo] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(true);
  const params = useParams();

  //Tar in datum för jämförelse med 1h framåt. Giltighet för byteslänken.
  useEffect(() => {
    const getCurrentResetTime = async () => {
      let result = await getExpireDate(params.id);
      console.log(result);
      setSessionExpired(result);
    };
    getCurrentResetTime().catch(console.error);
  }, []);

  useEffect(() => {
    const error = validatePassword(passwordOne);
    const errorTwo = validatePassword(passwordTwo);

    if (error == "" && errorTwo == "") {
      if (passwordOne == passwordTwo) {
        setErrorMessage("success");
      } else {
        setErrorMessage("Kontrollera att lösenorden är lika");
      }
    } else {
      setErrorMessage("Kontrollera att lösenordet uppfyller kraven");
    }
    setShowMessage(false);
  }, [passwordOne, passwordTwo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errorMessage == "success") {
      setSuccess(true);

      //Här kommer nya lösenordet skickas till databas tillsammans med en ny resetid innehållandes en param från url.
      const newCredentials = {
        newPassword: passwordOne,
        usedResetId: params.id,
      };

      updatePassword(newCredentials);
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
      ) : //här sätts en bool sättas in i nestlad ternary för att hantera när tiden går ut.
      sessionExpired ? (
        <form className="signinform" onSubmit={handleSubmit}>
          <h1 className="signinheader">Skapa nytt lösenord</h1>
          <p className="resetpasswordtext">
            Ditt lösenord måste vara minst 8 tecken, innehålla versaler, minst
            en siffra och ett specialtecken.
          </p>
          <div></div>

          <div className="signinfield labelspace">
            <label htmlFor="password" className="labelspace">
              Fyll i ditt nya lösenord
            </label>
            <input
              type="password"
              onChange={(e) => {
                setPasswordOne(e.target.value);
              }}
            />
          </div>

          <div className="signinfield">
            <label htmlFor="confirmpassword" className="labelspace">
              Upprepa lösenord
            </label>
            <input
              type="password"
              onChange={(e) => {
                setPasswordTwo(e.target.value);
              }}
            />
          </div>
          <button className="signinbutton">Återställ</button>
          {showMessage ? (
            <p className="signinerrormessage">{errorMessage}</p>
          ) : (
            ""
          )}
        </form>
      ) : (
        <div className="signinform">
          Länken är inte längre giltig
          <Link to="/reset" className="signinforgotpassword">
            <button className="signinbutton">Tillbaka</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default NewPassword;
