import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { uploadCsv } from "./test.service";
import "./test.css";
const Test = () => {
  const [file, setFile] = useState();
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [showMessage, setShowMessage] = useState("");

  //Nollställer error och status meddelande
  useEffect(
    () => {
      setError("");
      setStatus("");
    },
    [name],
    [file]
  );

  const handleOnChange = (event) => {
    setFile();
    if (event.target.files[0]) {
      setShowMessage(false);

      Papa.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          setFile(results.data);
          setStatus("Redo");
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
        setError("Vänligen ladda upp fil");
        setShowMessage(true);
      }
    }
  };
  return (
    <>
      <form className="testform">
        <div className="myaccountinput">
          <div></div>
          <h2>Ladda upp test</h2>
        </div>
        <div className="testinput">
          <label htmlFor="name">Namn på test:</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="testinput">
          <p>Ladda fil:</p>
          <input
            className="test-csv-input"
            type={"file"}
            id={"csvFileInput"}
            accept={".csv"}
            onChange={handleOnChange}
            name="name"
          />
        </div>

        <div className="test-status-row">
          <p>Status:</p>
          <p className="test-status">{status}</p>
          <button
            className="testbutton"
            onClick={(e) => {
              handleOnSubmit(e);
            }}
          >
            Ladda upp
          </button>
        </div>
      </form>
      <div>
        {" "}
        {showMessage ? <p className="signinerrormessage">{error}</p> : ""}
      </div>
    </>
  );
};

export default Test;
