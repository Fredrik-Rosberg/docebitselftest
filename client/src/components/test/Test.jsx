import React, { useState } from "react";
import Papa from "papaparse";
import "./test.css"
const Test = () => {
  const [file, setFile] = useState();
  const [status, setStatus] = useState("Redo");

  const fileReader = new FileReader();

  const handleOnChange = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results.data);
      },
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
      };

      fileReader.readAsText(file);
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
          <label htmlFor="lastname">Namn på test:</label>
          <input type="text" name="lastname" />
        </div>
        <div className="testinput">
          <p >Ladda fil:</p>
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
          <button className="testbutton"
            onClick={(e) => {
              handleOnSubmit(e);
            }}
          >
            Ladda upp
          </button>
        </div>
      </form>
    </>
  );
};

export default Test;
