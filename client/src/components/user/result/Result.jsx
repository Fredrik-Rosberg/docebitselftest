import React, { useState, useMemo, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "./result.css";
import { QuestionContext } from "../../context/QuestionContext";
import { createResult } from "../../user/overview/overview.user.service";

const Result = (props) => {
  const [answerObjectArray, SetAnswerObjectArray] = useState([]);
  const [passOrFail, setPassOrFail] = useState("");
  const [time, SetTime] = useContext(QuestionContext);
  const [resultObject, SetResultObject] = useState({
    courseid: 0,
    time: 0,
    score: 0,
  });

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
  const navigate = useNavigate();

  useEffect(() => {
    SetResultObject({ ...resultObject, score: props.correctCount, courseid:time.courseid, time:time.testtime });
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
  function handleQuestionChoice(id) {
    getFromSession(id);
    props.resultBool(false);
    props.questionnr(JSON.parse(localStorage.getItem(id)));
    props.setfacit(true);
  }

  function finishTest() {
    let clearCount = localStorage.length;

    sessionStorage.clear();
    for (let index = 1; index <= clearCount; index++) {
      localStorage.removeItem(index);
    }
    //courseid, score, time
    createResult(resultObject)
    console.log()
    console.log(time);
    console.log(props.correctCount);

    navigate("/user");
  }

  return (
    <>
      <div className="resultmain-container">
        <div className="resultoverview">
          <div className="passorfail">Resultat: {passOrFail}</div>
          <div className="passorfailtable">
            <div>
              Ditt resultat: <div>{props.correctCount}</div>
            </div>
            <div>
              Gräns för godkänt:{" "}
              <div>{Math.ceil((localStorage.length - 1) * 0.7)}</div>
            </div>
            <div>
              Totalt antal poäng: <div>{localStorage.length - 1}</div>
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
              onCellDoubleClicked={(e) =>
                handleQuestionChoice(e.data.questionnr)
              }
              rowData={answerObjectArray}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              suppressCellFocus={true}
              overlayNoRowsTemplate={"Inga test funna"}
            ></AgGridReact>
          </div>
        </div>
        <div className="resultbuttons">
          <div></div>

          <button
            onClick={() => finishTest()}
            className="quittestbutton generalbuttonstyle"
          >
            Avsluta
          </button>
        </div>
      </div>
    </>
  );
};

export default Result;
