import React, { useState, useEffect, useRef } from "react";
import { uploadImage } from "./courseorganizer.service";
const CourseOrganizer = () => {
  const inputNameEl = useRef(null);
  const inputCityEl = useRef(null);

  const [file, setFile] = useState();
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

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
    setPreviewImage();
    if (event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setShowMessage(false);
      setFile(event.target.files[0]);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!name || !city) {
      setError("Vänligen fyll i samtliga uppgifter");
      setShowMessage(true);
    } else if (!new RegExp(/^[A-Öa-ö\d]+$/).test(name) || name.length > 100) {
      setError("Ogiltig kursanordnare ");
      inputNameEl.current.focus();
    } else if (!new RegExp(/^[A-Öa-ö\d]+$/).test(city) || city.length > 100) {
      setError("Ogiltig stad ");
      inputCityEl.current.focus();
      setShowMessage(true);
    } else {
      if (file) {
        let data = { name: name, city: city };
        let result = await uploadImage(file, data);
        if (result.error) {
          setError(result.error);
          setShowMessage(true);
          setStatus("Misslyckad inläsning");
        } else {
          setError("");
          setMessage("Kursanordnare har sparats");
          setShowMessage(true);
          setStatus(result.status);
        }
      }
    }
  };
  return (
    <>
      <h2 className="form-h2">Ny kursanordnare</h2>
      <form className="form-container organizer-form">
        <div className="form-row-item">
          <label htmlFor="name">Kursanordnare:</label>
          <input
            ref={inputNameEl}
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-row-item">
          <label htmlFor="name">Stad:</label>
          <input
            ref={inputCityEl}
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
        <img className="previewImage" src={previewImage} alt="" />
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
