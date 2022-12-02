import React, { useState, useMemo, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AgGridReact } from "ag-grid-react";

const Result = (props) => {
  const [answerObjectArray, SetAnswerObjectArray] = useState([]);

  const [columnDefs] = useState([
    { field: "questionnr", headerName: "Test", width: 100 },
    { field: "youranswer", headerName: "Dina svar", width: 100 },
    { field: "correctanswer", headerName: "Rätt svar", width: 100 },
    { field: "result", headerName: "Resultat", width: 100 },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      sortingOrder: ["asc", "desc", "null"],
    }),
    []
  );

  async function setObject() {
    let tempArray = [];

    for (let index = 0; index < props.wrongAnswers.length; index++) {
      let answerGrid = {
        questionnr: 0,
        youranswer: [],
        correctanswer: [],
        result: false,
      };

      (answerGrid.questionnr = props.wrongAnswers[index][0] + 1),
        (answerGrid.youranswer = props.wrongAnswers[index][1]),
        (answerGrid.correctanswer = props.wrongAnswers[index][2]),
        (answerGrid.result =
          JSON.stringify(props.wrongAnswers[index][1]) ===
          JSON.stringify(props.wrongAnswers[index][2])
            ? true
            : false);

      console.log(answerGrid);
      tempArray.push(answerGrid);
    }

    console.log(tempArray);
    SetAnswerObjectArray(tempArray);
  }

  useEffect(() => {
    setObject();
  }, []);

  console.log(props.wrongAnswers[2][0]); ///Loggar frågeindex och lägger till 1 för frågenummer
  console.log(props.wrongAnswers[2][1]); // Dina svar array
  console.log(props.wrongAnswers[2][2]);
  return (
    <>
      <div className="table-container">
        <h2>Test</h2>
        <div
          className="ag-theme-alpine"
          style={{ height: 210, width: 400, fontFamily: "Raleway" }}
        >
          <AgGridReact
            rowData={answerObjectArray}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            // rowSelection={rowSelectionType}

            suppressCellFocus={true}
            // rowMultiSelectWithClick={true}
            overlayNoRowsTemplate={"Inga test funna"}
          ></AgGridReact>
        </div>
      </div>
    </>
  );
};

export default Result;
