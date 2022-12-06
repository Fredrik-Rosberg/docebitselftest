import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "./result.css";
import  Questions from "../questionsform/Questions"

const Result = (props) => {
  const [answerObjectArray, SetAnswerObjectArray] = useState([]);
  const [passOrFail, setPassOrFail] = useState("");

  const [columnDefs] = useState([
    { field: "questionnr", headerName: "Fråga", width: 100 },
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
    if (props.correctCount / (localStorage.length - 1) > 0.7) {
      setPassOrFail("Godkänd");
    } else {
      setPassOrFail("Ej godkänd");
    }
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

  function getFromSession(index) {
    if (sessionStorage.getItem(index) != null) {
      const getFromSession = sessionStorage.getItem(index);
      const arr = getFromSession.split(",");
      const boolarr = arr.map((item) =>
        item == "true" ? (item = true) : (item = false)
      );
      props.checkedChoice(boolarr);
    }
  }
  function handleQuestionChoice(id){
    getFromSession(id)
    props.resultBool(false)
    props.questionnr(JSON.parse(localStorage.getItem(id)));
   

  }


  return (
    <>
      <div className="resultmain-container">
        <div className="resultoverview">
          <div className="passorfail">Resultat: {passOrFail}</div>
          <div className="passorfailtable">
            <div>
              Ditt resultat <div>{props.correctCount}</div>
            </div>
            <div>
              Gräns för godkänt <div>{Math.ceil((localStorage.length - 1) * 0.7)}</div>
            </div>
            <div>
              Totalt antal poäng <div>{localStorage.length - 1}</div>
            </div>
          </div>
        </div>
        <div className="table-container">
          <div
            className="ag-theme-alpine"
            style={{
              height: 420,
              width: 460,
              fontFamily: "Raleway",
              textAlign: "center",
            }}
          >
            <AgGridReact
              onCellDoubleClicked={(e)=>handleQuestionChoice(e.data.questionnr)}
              rowData={answerObjectArray}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              suppressCellFocus={true}
              overlayNoRowsTemplate={"Inga test funna"}
            ></AgGridReact>
          </div>
        </div>
        <div className="resultbuttons">
          <div>
            
          </div>
          <Link to={"/user"}>
            <button
              onClick={() => finishTest}
              className="quittestbutton generalbuttonstyle"
            >
              Avsluta
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Result;
