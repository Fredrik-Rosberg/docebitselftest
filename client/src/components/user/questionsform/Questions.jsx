import React, { useState, useEffect } from "react";
import "./questions.css";
import { useTimer } from "react-timer-hook";
import UseTimer from "./Timer";
import { BsStar, BsStarFill } from "react-icons/bs";

const Questions = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 12 * 60);
  const [question, SetQuestion] = useState(JSON.parse(localStorage.getItem(1)));
  const alpha = Array.from(Array(11)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x).toLowerCase());
  const [checked, SetChecked] = useState(Array(11).fill(false));
  const localStorageCount = Array.from(
    { length: localStorage.length },
    (v, i) => i
  );
  const [starInDropDown, setStarInDropDown] = useState(
    Array(localStorage.length).fill(false)
  );

  useEffect(() => {
    getFromSession(-question.fråganr + 1);
  }, [starInDropDown]);

  function handleNext() {
    let array = Array(11).fill(false);
    SetChecked(array);
    getFromSession(question.fråganr + 1);
    SetQuestion(JSON.parse(localStorage.getItem(question.fråganr + 1)));
    sessionStorage.setItem(question.fråganr, checked);
  }

  function handlePrevious() {
    let array = Array(11).fill(false);
    SetChecked(array);
    getFromSession(question.fråganr - 1);
    SetQuestion(JSON.parse(localStorage.getItem(question.fråganr - 1)));
    sessionStorage.setItem(question.fråganr, checked);
  }

  function getFromSession(index) {
    if (sessionStorage.getItem(index) != null) {
      const getFromSession = sessionStorage.getItem(index);
      const arr = getFromSession.split(",");
      const boolarr = arr.map((item) =>
        item == "true" ? (item = true) : (item = false)
      );
      SetChecked(boolarr);
    }
  }

  function handleQuestionChoice(choice) {
    console.log(choice);
    let array = Array(11).fill(false);
    SetChecked(array);
    getFromSession(choice);
    SetQuestion(JSON.parse(localStorage.getItem(choice)));
    sessionStorage.setItem(question.fråganr, checked);
  }

  async function handleLastQuestion(){
    let array = Array(11).fill(false);
    SetChecked(array);
    sessionStorage.setItem(question.fråganr, checked);

  }

  function handleAbort() {}

  async function handleFinishTest() {
    
    await handleLastQuestion();

    //get all results unfinished
    const resultarray = localStorageCount.map((item) => [
      sessionStorage.getItem(item + 1),
    ]);
    console.log(resultarray);

    let array1 = resultarray.map((item) =>
      item.map((item2) => item2.split(","))
    );
    console.log(array1);

    let array2 = array1.map((item) =>
      item.map((item2) =>
        item2.map((item3, index) =>
          item3 == "true"
            ? (item3 = String.fromCharCode(97 + index))
            : (item3 = false)
        )
      )
    );

    let cleanUpArr = array2.map((item) =>
      item.map((item2) => item2.filter(Boolean))
    );
    
    console.log(cleanUpArr);


    //get all questions
    let questionArray = localStorageCount.map((item) =>
      JSON.parse(localStorage.getItem(item + 1))
    );
    console.log(questionArray);
    questionArray.map((index) =>
      alphabet.map((letter) =>
        index["frågealternativ" + letter] != ""
          ? console.log("x")
          : console.log("y")
      )
    );

    questionArray.map((item) => console.log(item.svar));
  }

  function handleChecked(index) {
    SetChecked(Array().fill(false));
    let array = [...checked];
    array[index] = !array[index];
    array.map((item) =>
      item != true || item != false ? (item = false) : (item = item)
    );
    SetChecked(array);
  }

  const handleStar = () => {
    let array = [...starInDropDown];
    array[question.fråganr - 1] = !array[question.fråganr - 1];
    array.map((item) =>
      item != true || item != false ? (item = false) : (item = item)
    );

    setStarInDropDown(array);
  };

  return (
    <>
      <div className="questionsmain">
        <p></p>
        <p>{useTimer.onExpire}</p>
        <div>
          <UseTimer expiryTimestamp={time} />
          <select
            className="questiondropdown"
            onChange={(e) => handleQuestionChoice(e.target.value)}
          >
            {localStorageCount.map((item) => (
              <option key={item + 1} value={item + 1}>
                Fråga {item + 1} {starInDropDown[item] ? "★" : " "}
              </option>
            ))}
          </select>
        </div>
        <div className="questionscontainer">
          <div className="questionsblock">
            {starInDropDown[question.fråganr - 1] ? (
              <BsStarFill className="handlestar" onClick={handleStar} />
            ) : (
              <BsStar className="handlestar" onClick={handleStar} />
            )}
            <div className="questionsblockinner">
              <h3 className="questionnumber ralewayweight500">
                Fråga {question.fråganr}
              </h3>
              <div className="question setfontsize">{question.fråga}</div>
              <div className="setfontsize choosetext">
                Välj ett eller flera av svaren nedan
              </div>
              <div className="questionscrollcontainer setfontsize">
                {alphabet.map((item, index) =>
                  question["frågealternativ" + item] != "" ? (
                    <div key={index} className="questiongrid">
                      <input
                        checked={checked[index]}
                        value={item}
                        onChange={() => handleChecked(index)}
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
              <button onClick={handleAbort}>Avbryt</button>
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
