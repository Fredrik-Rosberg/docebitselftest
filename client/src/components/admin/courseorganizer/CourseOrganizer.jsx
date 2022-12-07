import React, { useState, useEffect, useRef } from "react";
import { uploadImage } from "./courseorganizer.service";
const CourseOrganizer = () => {
  const inputEl = useRef(null);
  const [file, setFile] = useState();
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState("");

  //Nollställer error och status meddelande
  useEffect(() => {
    setError("");
    setMessage("");
    if (!file) {
      setStatus("");
    } else {
      setStatus("Redo");
    }
  }, [name, file, city]);

  const handleOnChange = (event) => {
    setFile();
    if (event.target.files[0]) {
      setShowMessage(false);
      setFile(event.target.files[0]);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!name || !city) {
      setError("Vänligen fyll i samtliga uppgifter");
      setShowMessage(true);
    } else if (!new RegExp(/^[A-Öa-ö\d]+$/).test(name) || name.length > 100) {
      setError(
        "Namn får endast innehålla bokstäver och siffror och vara max 100 tecken långt"
      );
      setShowMessage(true);
    } else {
      if (file) {
        let data = {name: name, city: city}
        await uploadImage(file, data);
      }
    }
  };
  return (
    <>
      <h2 className="form-h2">Ny kursanordnare</h2>
      <form className="form-container test-form">
        <div className="form-row-item">
          <label htmlFor="name">Kursanordnare:</label>
          <input
            ref={inputEl}
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-row-item">
          <label htmlFor="name">Stad:</label>
          <input
            ref={inputEl}
            type="text"
            name="name"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="form-row-item">
          <label htmlFor="load-file">Logotyp:</label>
          <input
            className="form-load-file-input"
            type={"file"}
            id={"logo-input"}
            accept="image/png, image/jpeg"
            onChange={handleOnChange}
            name="logo"
          />
        </div>
        <div className="form-status-row">
          <label className="form-label" htmlFor="status">
            Status:
          </label>
          <p className="test-status">{status}</p>
          <button
            className="form-button"
            onClick={(e) => {
              handleOnSubmit(e);
            }}
          >
            Spara
          </button>
        </div>{" "}
        <div className="messages form-test-messages">
          {showMessage && (
            <>
              <p className="error-message">{error}</p>
              <p className="success-message">{message}</p>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default CourseOrganizer;
