import React, { useState, useEffect } from "react";
import "./questions.css";
import { useTimer } from "react-timer-hook";
import UseTimer from "./Timer";

const Questions = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 12 * 60);
  const [question, SetQuestion] = useState(JSON.parse(localStorage.getItem(1)));
  const alphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];
  const [checked, SetChecked] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
 

  function handleNext() {
    SetQuestion(JSON.parse(localStorage.getItem(question.id + 1)));
    console.log(localStorage.length);
  }

  function handlePrevious() {
    SetQuestion(JSON.parse(localStorage.getItem(question.id - 1)));
  }

  function handleAbort() {}
  function handleFinishTest() {}

  return (
    <>
      <div className="questionsmain">
        <p>1</p>
        <p>{useTimer.onExpire}</p>
        <div>
          <UseTimer expiryTimestamp={time} />
        </div>
        <div className="questionscontainer">
          <div className="questionsblock">
            <div>star</div>
            <div className="questionsblockinner">
              <h3 className="questionnumber">Fråga {question.id}</h3>
              <div className="question setfontsize">{question.fråga}</div>
              <div className="setfontsize">
                Välj ett eller flera av svaren nedan
              </div>
              <div className="questionscrollcontainer setfontsize">
                {alphabetArray.map((item, index) =>
                  question["frågealternativ" + item] != "" ? (
                    <div key={index} className="questiongrid">
                      <input onChange={changeChecked} type="checkbox"></input>
                      <label>{question["frågealternativ" + item]}</label>
                    </div>
                  ) : (
                    ""
                  )
                )}
              </div>
            </div>
          </div>

          <div className="questionsbuttons">
            <div>
              {question.id == 1 ? (
                ""
              ) : (
                <button onClick={handlePrevious}>Föregående</button>
              )}
            </div>
            <div>
              <button onClick={handleAbort}>avbryt</button>
            </div>

            <div>
              {localStorage.length != question.id ? (
                <button onClick={handleNext}>Nästa</button>
              ) : (
                <button onClick={handleFinishTest}>Avsluta test</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions;
