import React, { useState, useEffect } from "react";
import "./createCourseOccasion.css";
import { validateInputsCourseOccasion } from "../signin/validationService.js";
import { createCourseOccasion } from "../createCourseOccasion/createCourseOccasionService";

const CreateCourseOccasion = () => {
  const [newCourseOccasion, setNewCourseOccasion] = useState({
    name: "",
    startdate: "",
    enddate: "",
    courseorganizer: "",
  });
  const [message, setMessage] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [showMessages, setShowMessages] = useState(false);

  useEffect(() => {
    let validatedName = validateInputsCourseOccasion(newCourseOccasion);

    if (validatedName != "") {
      setValidationMessage(validatedName);
    }

    if (newCourseOccasion.startdate == "" || newCourseOccasion.enddate == "") {
      setValidationMessage(
        "Vänligen fyll i samtliga uppgifter för att skapa kurstillfälle"
      );
    }

    setShowMessages(false);
  }, [
    newCourseOccasion.name,
    newCourseOccasion.courseorganizer,
    newCourseOccasion.startdate,
    newCourseOccasion.enddate,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validationMessage == "") {
      let result = await createCourseOccasion(newCourseOccasion);
      if (result == "Kurstillfälle skapat") {
        setMessage(result);
      } else {
        setMessage("");
        setValidationMessage(result);
      }
    }

    setShowMessages(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="createcourseoccasionform">
        <div className="courseoccasioninput">
          <div></div>
          <h2>Skapa kurstillfälle</h2>
        </div>
        <div className="courseoccasioninput">
          <label htmlFor="kursnamn">Kursnamn:</label>
          <input
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
          <label htmlFor="giltigfrom">Kursstart:</label>
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
          <label htmlFor="giltigtom">Kursslut:</label>
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
        <div className="courseoccasioninput">
          <div></div>
          <button>Spara</button>
        </div>
        <div>
          {showMessages ? (
            <>
              <p className="courseoccasionmessage">{message}</p>
              <p className="courseoccasionvalidationmessage">{validationMessage}</p>
            </>
          ) : (
            ""
          )}
        </div>
      </form>
    </>
  );
};

export default CreateCourseOccasion;
