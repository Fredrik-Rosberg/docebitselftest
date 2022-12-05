import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "./result.css";


const Result = (props) => {
  const [answerObjectArray, SetAnswerObjectArray] = useState([]);

  const [columnDefs] = useState([
    { field: "questionnr", headerName: "Fråga", width: 120 },
    { field: "youranswer", headerName: "Ditt svar", width: 120 },
    { field: "correctanswer", headerName: "Rätt svar", width: 120 },
    { field: "result", headerName: "Resultat", width: 120 },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      sortingOrder: ["asc", "desc", "null"],
    }),
    []
  );

  useEffect(() => {
    setObject();
  }, []);

  async function setObject() {
    let tempArray = [];

    for (let index = 0; index < props.wrongAnswers.length; index++) {
      let answerGrid = {
        questionnr: 0,
        youranswer: [],
        correctanswer: [],
        result: "",
      };

      (answerGrid.questionnr = props.wrongAnswers[index][0] + 1),
        (answerGrid.youranswer = props.wrongAnswers[index][1]),
        (answerGrid.correctanswer = props.wrongAnswers[index][2]),
        (answerGrid.result =
          JSON.stringify(props.wrongAnswers[index][1]) ===
          JSON.stringify(props.wrongAnswers[index][2])
            ? "✔️"
            : "❌");

      console.log(answerGrid);
      tempArray.push(answerGrid);
    }

    console.log(tempArray);
    SetAnswerObjectArray(tempArray);
  }
  function finishTest(){
    //Send to result and empty local- and sessionstorage


  }

  

  return (
    <>
      <div className="resultmain-container">
        <div className="resultoverview"></div>
        <div className="table-container">
          <div
            className="ag-theme-alpine"
            style={{ height: 420, width: 480, fontFamily: "Raleway", textAlign:"center" }}
          >
            <AgGridReact
              rowData={answerObjectArray}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              suppressCellFocus={true}
              overlayNoRowsTemplate={"Inga test funna"}
            ></AgGridReact>
          </div>
        </div>
        <div className="resultbuttons">
          <button className="backtotestbutton generalbuttonstyle">
            Tillbaka till testet
          </button>
          <Link to={'/user'}>
          <button onClick={()=>finishTest}className="quittestbutton generalbuttonstyle">Avsluta</button>
        </Link></div>
      </div>
    </>
  );
};

export default Result;
