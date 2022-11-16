import React, { useState } from "react";
import Papa from "papaparse";
import "./test.css";
const Test = () => {
  const [file, setFile] = useState({});
  const [status, setStatus] = useState("Redo");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [showMessage, setShowMessage] = useState("");

  const fileReader = new FileReader();

  const handleOnChange = (event) => {
    console.log(event);
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setFile(results.data);
      },
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!new RegExp(/^[A-Öa-ö\d]+$/).test(name) || name.length > 100) {
      setError(
        "Namn får endast innehålla bokstäver och siffror och vara max 100 tecken långt"
      );
      setShowMessage(true);
    } else {
      console.log("skicka objekt");
      if (file) {
        fileReader.onload = function (event) {
          const csvOutput = event.target.result;
        };

        fileReader.readAsText(file);
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
