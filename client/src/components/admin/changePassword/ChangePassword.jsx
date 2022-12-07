import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { changePassword, checkCurrentPassword } from "./changePassword.service";
import { validatePassword } from "../../signIn/validation.service";
import UpdatePasswordModal from "../../modal/UpdatedPassWordModal";
import { focusOnEmptyInputField } from "../../admin/createAccount/CreateAccount";

function ChangePassword() {
  const inputCurrentPassword = useRef(null);
  const inputNewPassword = useRef(null);
  const inputConfirmNewPassword = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [showMessage, setShowMessage] = useState(false);
const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (passwordOne == passwordTwo) {
      const error = validatePassword(passwordOne);
      if (error == "") {
        setErrorMessage("success");
      } else {
        setErrorMessage(
          "Lösenordet måste innehålla 8-50 tecken, minst en stor bokstav, en liten bokstav, en siffra samt ett specialtecken (!&?-#)"
        );
      }
    } else {
      setErrorMessage("Kontrollera att lösenorden är lika");
    }
    setShowMessage(false);
  }, [passwordOne, passwordTwo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    focusOnEmptyInputField(inputConfirmNewPassword);
    focusOnEmptyInputField(inputNewPassword);
    focusOnEmptyInputField(inputCurrentPassword);
    let checkedPassword = false;
    if (errorMessage == "success") {
      checkedPassword = await checkCurrentPassword(currentPassword, params.id);
    }

    if (checkedPassword) {
      setSuccess(true);
      setOpenModal(true);
      let resp = await changePassword(passwordOne, params.id);
      console.log(resp.result);
      setPasswordOne("");
      setPasswordTwo("");
      setCurrentPassword("");
    } else if (errorMessage == "success" && !checkedPassword) {
      setErrorMessage("Kontrollera ditt nuvarande lösenord");
      setShowMessage(true);
    } else {
      setShowMessage(true);
    }
  };

  return (
    <>
      <h2 className="form-h2">Ändra lösenord</h2>
      <form
        className="form-container change-password-form"
        onSubmit={handleSubmit}
      >
        <div className="form-row-item">
          <label htmlFor="password" className="labelspace">
            Nuvarande lösenord:
          </label>
          <input
            value={currentPassword}
            ref={inputCurrentPassword}
            type="password"
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
          />
        </div>

        <div className="form-row-item">
          <label htmlFor="password" className="labelspace">
            Nytt lösenord:
          </label>
          {success ? (
            <UpdatePasswordModal
              content="Lösenord har ändrats"
              onClose={() => setOpenModal(!openModal)}
              show={openModal}
            ></UpdatePasswordModal>
          ) : (
            ""
          )}
          <input
            value={passwordOne}
            ref={inputNewPassword}
            type="password"
            onChange={(e) => {
              setPasswordOne(e.target.value);
            }}
          />
        </div>

        <div className="form-row-item">
          <label htmlFor="confirmpassword" className="labelspace">
            Upprepa nytt lösenord:
          </label>
          <input
            value={passwordTwo}
            ref={inputConfirmNewPassword}
            type="password"
            onChange={(e) => {
              setPasswordTwo(e.target.value);
            }}
          />
        </div>
        <div className="form-buttons-container">
        
            <button type="button" className="form-button" onClick={() => navigate(-1)}>
              Tillbaka
            </button>
          <button type="submit" className="form-button">
            Spara
          </button>
        </div>
        <div className="messages">
          {showMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </form>
    </>
  );
}

export default ChangePassword;
