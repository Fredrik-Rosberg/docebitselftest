import React, { useState, useEffect, useRef } from "react";
import { validateInputsCourseOccasion } from "../../signIn/validation.service";
import { createCourseOccasion } from "./createCourseOccasion.service";
import {
  focusOnEmptyInputField,
  focusOnWrongInput,
} from "../../admin/createAccount/CreateAccount";

const CreateCourseOccasion = () => {
  const inputNameEl = useRef(null);
  const inputOrganizerEl = useRef(null);

  const [newCourseOccasion, setNewCourseOccasion] = useState({
    name: "",
    startdate: "",
    enddate: "",
    courseorganizer: "",
  });
  const [message, setMessage] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [showErrorMessages, setShowErrorMessages] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  useEffect(() => {
    setNewCourseOccasion({
      name: "",
      startdate: "",
      enddate: "",
      courseorganizer: "",
    });
  }, [message]);

  useEffect(() => {
    let result = validateInputsCourseOccasion(newCourseOccasion);
    setValidationMessage(result);
    if (newCourseOccasion.startdate == "" || newCourseOccasion.enddate == "") {
      setValidationMessage("Vänligen fyll i samtliga uppgifter");
    }
    setShowErrorMessages(false);
  }, [
    newCourseOccasion.name,
    newCourseOccasion.courseorganizer,
    newCourseOccasion.startdate,
    newCourseOccasion.enddate,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowMessages(false);
    focusOnEmptyInputField(inputOrganizerEl);
    focusOnEmptyInputField(inputNameEl);
    if (validationMessage != "") {
      focusOnWrongInput(inputOrganizerEl);
      focusOnWrongInput(inputNameEl);
    }
    if (validationMessage == "") {
      let result = await createCourseOccasion(newCourseOccasion);
      if (result == "Kurstillfälle skapat") {
        setMessage(result);
        setShowMessages(true);
      } else {
        setMessage("");
        setValidationMessage(result);
      }
    }

    setShowErrorMessages(true);
  };

  return (
    <>
      <h2 className="form-h2">Skapa kurstillfälle</h2>
      <form
        onSubmit={handleSubmit}
        className="form-container create-courseoccasion-form"
      >
        <div className="form-row-item">
          <label htmlFor="courseoccasion-name">Kursnamn:</label>
          <input
            ref={inputNameEl}
            value={newCourseOccasion.name}
            type="text"
            className="nameinput"
            onChange={(e) => {
              setNewCourseOccasion({
                ...newCourseOccasion,
                name: e.target.value,
              }),
                setValidationMessage(""),
                setMessage("");
            }}
          />
        </div>
        <div className="form-row-item">
          <label htmlFor="courseoccasion-organizer">Kursanordnare:</label>
          <input
            ref={inputOrganizerEl}
            value={newCourseOccasion.courseorganizer}
            type="text"
            className="nameinput"
            onChange={(e) => {
              setNewCourseOccasion({
                ...newCourseOccasion,
                courseorganizer: e.target.value,
              }),
                setValidationMessage(""),
                setMessage("");
            }}
          />
        </div>
        <div className="form-row-item">
          <label htmlFor="courseoccasion-startdate">Startdatum:</label>
          <input
            className="form-dateinput"
            value={newCourseOccasion.startdate}
            min={new Date().toLocaleDateString("sv-SE")}
            max={newCourseOccasion.enddate}
            type="date"
            onChange={(e) => {
              setNewCourseOccasion({
                ...newCourseOccasion,
                startdate: e.target.value,
              }),
                setValidationMessage(""),
                setMessage("");
            }}
          />
        </div>
        <div className="form-row-item">
          <label htmlFor="courseoccasion-enddate">Slutdatum:</label>
          <input
            className="form-dateinput"
            value={newCourseOccasion.enddate}
            min={
              newCourseOccasion.startdate == ""
                ? new Date().toLocaleDateString("sv-SE")
                : newCourseOccasion.startdate
            }
            type="date"
            onChange={(e) => {
              setNewCourseOccasion({
                ...newCourseOccasion,
                enddate: e.target.value,
              }),
                setValidationMessage(""),
                setMessage("");
            }}
          />
        </div>
        <button className="form-button">Spara kurstillfälle</button>
        <div className="messages">
          {showMessages && (
            <>
              <p className="success-message">{message}</p>
            </>
          )}
          {showErrorMessages && (
            <>
              <p className="error-message">{validationMessage}</p>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default CreateCourseOccasion;
