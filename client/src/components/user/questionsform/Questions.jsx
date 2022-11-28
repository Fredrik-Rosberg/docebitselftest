import React, { useState, useEffect } from "react";
import "./questions.css";
import { useTimer } from "react-timer-hook";
import UseTimer from "./Timer";
import { BsStar } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";

// AiOutlineStar
// AiFillStar
const Questions = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 12 * 60);
  const [question, SetQuestion] = useState(JSON.parse(localStorage.getItem(1)));
  const alpha = Array.from(Array(11)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x).toLowerCase());
  const [checked, SetChecked] = useState([]);
  const [counter, SetCounter] = useState(0);
  const [star, setStar] = useState(false);

  useEffect(() => {
    let count = 0;
    alphabet.map((item) =>
      question["frågealternativ" + item] != "" ? (count = count + 1) : ""
    );
    SetCounter(count);
  }, [question]);

  function handleNext() {
    SetQuestion(JSON.parse(localStorage.getItem(question.fråganr + 1)));
    sessionStorage.setItem(question.fråganr, checked);
  }

  function handlePrevious() {
    SetQuestion(JSON.parse(localStorage.getItem(question.fråganr - 1)));
    let arrayFalse = Array(counter).fill(false);
    const getFromSession = sessionStorage.getItem(question.fråganr - 1);
    let test = getFromSession.split(",");
    test.map((item) =>
      item == "true"
        ? (arrayFalse[item.index] = true)
        : (arrayFalse[item.index] = false)
    );

    console.log(test);
    console.log(arrayFalse);
    console.log(getFromSession);
  }

  function handleAbort() {}
  function handleFinishTest() {}

  function handleChecked(index, item) {
    let array = [...checked];
    array[index] = item;
    SetChecked(array);
  }

  useEffect(() => {
    console.log(checked);
  });

  const handleStar = () => {
    setStar((star) => !star);
  };

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
            {star ? (
              <BsStarFill onClick={handleStar} />
            ) : (
              <BsStar onClick={handleStar} />
            )}
            <div className="questionsblockinner">
              <h3 className="questionnumber">Fråga {question.fråganr}</h3>
              <div className="question setfontsize">{question.fråga}</div>
              <div className="setfontsize">
                Välj ett eller flera av svaren nedan
              </div>
              <div className="questionscrollcontainer setfontsize">
                {alphabet.map((item, index) =>
                  question["frågealternativ" + item] != "" ? (
                    <div key={index} className="questiongrid">
                      <input
                        value={item}
                        onChange={() => handleChecked(index, item)}
                        type="checkbox"
                      ></input>
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
