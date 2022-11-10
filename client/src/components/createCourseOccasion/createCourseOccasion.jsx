import React, { useState, useEffect } from "react";
import "./createCourseOccasion.css";
import { validateUserInputOnlyLetters } from "../signin/validationService.js";
import { createCourse } from "../createCourseOccasion/createCourseOccasionService";

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
    let validatedName = validateUserInputOnlyLetters(newCourseOccasion.name);
    let validatedCourseOrganizer = validateUserInputOnlyLetters(
      newCourseOccasion.courseorganizer
    );

    if (validatedName != "") {
      setValidationMessage(validatedName);
    }
    if (validatedCourseOrganizer != "") {
      setValidationMessage(validatedCourseOrganizer);
    }

    setShowMessages(false);
  }, [newCourseOccasion.name, newCourseOccasion.courseorganizer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validationMessage == "") {
      let result = await createCourse(newCourseOccasion);
      setMessage(result);
    }
    setShowMessages(true);
  };

  return (
    <>
      {/* <div className="adminrightmain"> */}
        <form onSubmit={handleSubmit} className="createcourseform">
          <div className="courseinput">
            <div></div>
            <h2>Skapa kurstillfälle</h2>
          </div>
          <div className="courseinput">
            <label htmlFor="kursnamn">Kursnamn:</label>
            <input
              type="text"
              className="nameinput"
              onChange={(e) => {
                setNewCourseOccasion({
                  ...newCourseOccasion,
                  name: e.target.value,
                });
              }}
            />
          </div>
          <div className="courseinput">
            <label htmlFor="kursanordnare">Kursanordnare:</label>
            <input
              type="text"
              className="nameinput"
              onChange={(e) => {
                setNewCourseOccasion({
                  ...newCourseOccasion,
                  courseorganizer: e.target.value,
                });
              }}
            />
          </div>
          <div className="courseinput">
            <label htmlFor="giltigfrom">Kursstart:</label>
            <input
              type="date"
              className="dateinput"
              onChange={(e) => {
                setNewCourseOccasion({
                  ...newCourseOccasion,
                  startdate: e.target.value,
                });
              }}
            />
          </div>
          <div className="courseinput">
            <label htmlFor="giltigtom">Kursslut:</label>
            <input
              type="date"
              className="dateinput"
              onChange={(e) => {
                setNewCourseOccasion({
                  ...newCourseOccasion,
                  enddate: e.target.value,
                });
              }}
            />
          </div>
          <div className="courseinput">
            <div></div>
            <button>Spara</button>
          </div>
          <div className="showmessage">
            {showMessages ? (
              <>
                <p>{message}</p>
                <p>{validationMessage}</p>
              </>
            ) : (
              ""
            )}
          </div>
        </form>
      {/* </div> */}
    </>
  );
};

export default CreateCourseOccasion;
