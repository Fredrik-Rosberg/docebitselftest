import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { uploadCsv } from "./uploadtest.service";
const UploadTest = () => {
  const [file, setFile] = useState();
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [showMessage, setShowMessage] = useState("");

  //Nollställer error och status meddelande
  useEffect(() => {
    setError("");
    if (!file) {
      setStatus("");
    } else {
      setStatus("Redo");
    }
  }, [name, file]);

  const handleOnChange = (event) => {
    setFile();
    if (event.target.files[0]) {
      setShowMessage(false);

      Papa.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          if (results.errors.length > 0) {
            setStatus("Fel filformat");
          } else {
            setFile(results.data);
          }
        },
      });
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!new RegExp(/^[A-Öa-ö\d]+$/).test(name) || name.length > 100) {
      setError(
        "Namn får endast innehålla bokstäver och siffror och vara max 100 tecken långt"
      );
      setShowMessage(true);
    } else {
      if (file) {
        let csvFile = { name: name, file: file };
        let result = await uploadCsv(csvFile);
        if (result.error) {
          setError(result.error);
          setShowMessage(true);
          setStatus("Misslyckad inläsning");
        } else {
          setStatus(result.status);
        }
        console.log(result);
      } else {
        setStatus("Misslyckad inläsning");
        setShowMessage(true);
      }
    }
  };
  return (
    <>
      <h2 className="form-h2">Ladda upp test</h2>
      <form className="form-container test-form">
        <div className="form-row-item">
          <label htmlFor="name">Namn på test:</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-row-item">
          <label htmlFor="load-file">Ladda fil:</label>
          <input
            className="form-load-file-input"
            type={"file"}
            id={"csvFileInput"}
            accept={".csv"}
            onChange={handleOnChange}
            name="name"
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
            Ladda upp
          </button>
        </div>
      </form>
      <div className="messages">
        {showMessage && <p className="error-message">{error}</p>}
      </div>
    </>
  );
};

export default UploadTest;
