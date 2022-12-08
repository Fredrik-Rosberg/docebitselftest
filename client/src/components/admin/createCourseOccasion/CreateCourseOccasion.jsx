import React, { useState, useEffect, useRef } from "react";
import { validateInputsCourseOccasion } from "../../signIn/validation.service";
import { createCourseOccasion } from "./createCourseOccasion.service";
import {
  focusOnEmptyInputField,
  focusOnWrongInput,
} from "../../admin/createAccount/CreateAccount";
import { getCourseOrganizers } from "./createCourseOccasion.service";

const CreateCourseOccasion = () => {
  const inputNameEl = useRef(null);

  const [newCourseOccasion, setNewCourseOccasion] = useState({
    name: "",
    startdate: "",
    enddate: "",
    courseorganizerid: "",
  });
  const [message, setMessage] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [showErrorMessages, setShowErrorMessages] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [courseorganizer, setCourseorganizer] = useState([]);
  useEffect(() => {
    setNewCourseOccasion({
      name: "",
      startdate: "",
      enddate: "",
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
    newCourseOccasion.courseorganizerid,
    newCourseOccasion.startdate,
    newCourseOccasion.enddate,
  ]);
  useEffect(() => {
    const getOrganizers = async () => {
      let data = await getCourseOrganizers();
      setCourseorganizer(data);
    };
    getOrganizers();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowMessages(false);
    focusOnEmptyInputField(inputNameEl);
    if (validationMessage != "") {
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
          <select
            className="form-select select-organizer"
            value={newCourseOccasion.courseorganizerid}
            onChange={(e) =>
              setNewCourseOccasion({
                ...newCourseOccasion,
                courseorganizerid: e.target.value,
              })
            }
          >
            <option value={null}>Ingen kursanordnare</option>
            {courseorganizer.map((organizer) => (
              <option
                key={organizer.id + Math.random()}
                value={organizer.id}
              >{`${organizer.name} ${organizer.city}`}</option>
            ))}
          </select>
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
