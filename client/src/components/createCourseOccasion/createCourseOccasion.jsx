import React, { useState, useEffect, useRef } from "react";
import "./createCourseOccasion.css";
import { validateInputsCourseOccasion } from "../signIn/validation.service.js";
import { createCourseOccasion } from "./createCourseOccasion.service";
import { focusOnEmptyInputField } from "../admin/createAccount/CreateAccount";

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
    focusOnEmptyInputField(inputOrganizerEl);
    focusOnEmptyInputField(inputNameEl);
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
      <h2 className="h2-styled">Skapa kurstillfälle</h2>
      <form onSubmit={handleSubmit} className="createcourseoccasionform">
        <div className="courseoccasioninput">
          <label htmlFor="kursnamn">Kursnamn:</label>
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
        <div className="courseoccasioninput">
          <label htmlFor="kursanordnare">Kursanordnare:</label>
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
        <div className="courseoccasioninput">
          <label htmlFor="giltigfrom">Startdatum:</label>
          <input
            value={newCourseOccasion.startdate}
            min={new Date().toLocaleDateString("sv-SE")}
            max={newCourseOccasion.enddate}
            type="date"
            className="dateinput"
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
        <div className="courseoccasioninput">
          <label htmlFor="giltigtom">Slutdatum:</label>
          <input
            value={newCourseOccasion.enddate}
            min={
              newCourseOccasion.startdate == ""
                ? new Date().toLocaleDateString("sv-SE")
                : newCourseOccasion.startdate
            }
            type="date"
            className="dateinput"
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
        <button className="course-occasion-button">Spara kurstillfälle</button>
        <div className="messages">
          {showMessages && (
            <>
              <p className="courseoccasionmessage">{message}</p>
            </>
          )}
          {showErrorMessages && (
            <>
              <p className="courseoccasionvalidationmessage">
                {validationMessage}
              </p>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default CreateCourseOccasion;
