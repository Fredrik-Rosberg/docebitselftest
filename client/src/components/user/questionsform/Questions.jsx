import React, { useState, useEffect } from "react";
import "./questions.css";
import { useTimer } from "react-timer-hook";
import UseTimer from "./Timer";
import { BsStar, BsStarFill } from "react-icons/bs";
import QuestionModalComponent from "../../modal/QuestionModal";
import Result from "../result/Result";

const Questions = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 12 * 60);
  const [question, SetQuestion] = useState(JSON.parse(localStorage.getItem(1)));
  const alpha = Array.from(Array(11)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x).toLowerCase());
  const [checked, SetChecked] = useState(Array(11).fill(false));
  const localStorageCount = Array.from(
    { length: localStorage.length-1 },
    (v, i) => i
  );
  const [starInDropDown, setStarInDropDown] = useState(
    Array(localStorage.length).fill(false)
  );

  const [correctCount, SetCorrectCount] = useState(0);
  const [wrongAnswers, SetWrongAnswers] = useState([{}]);
  const [openModal, setOpenModal] = useState(false);
  const [getToResult, setGetToResult]=useState(false)

  useEffect(() => {
    if (sessionStorage.length == 0) {
      localStorageCount.map((index) =>
        sessionStorage.setItem(index + 1, checked)
      );
    }
  }, []);

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
    let array = Array(11).fill(false);
    SetChecked(array);
    getFromSession(choice);
    SetQuestion(JSON.parse(localStorage.getItem(choice)));
    sessionStorage.setItem(question.fråganr, checked);
  }

  async function handleLastQuestion() {
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

    let array1 = resultarray.map((item) =>
      item.map((item2) => item2.split(","))
    );

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
    console.log(cleanUpArr)

    //get all questions
    let questionArray = localStorageCount.map((item) =>
      JSON.parse(localStorage.getItem(item + 1))
    );

    console.log(questionArray)

    let correctAnswerArray = questionArray.map((item) => [item.svar]);

    let correctAnswerArray2 = correctAnswerArray.map((item) =>
      item.map((item) => item.split(","))
    );
    console.log(correctAnswerArray)

    //Jämföra rätt svar med angivna svar
    let correctAnswerCount = 0;
    let wrongAnswersArray = [];

    localStorageCount.map((index) =>
      JSON.stringify(cleanUpArr[index]) ===
      JSON.stringify(correctAnswerArray2[index])
        ? (wrongAnswersArray.push([
            index,
            cleanUpArr[index],
            correctAnswerArray2[index]
        ]),correctAnswerCount += 1)
        : wrongAnswersArray.push([
            index,
            cleanUpArr[index],
            correctAnswerArray2[index]
        ])
    );
        console.log(wrongAnswersArray)
    SetCorrectCount(correctAnswerCount);
    SetWrongAnswers(wrongAnswersArray);
    
    //Hantera modal och navigering
    setGetToResult(true)
    setOpenModal(false)
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
   
    {!getToResult?(<div className="questionsmain">
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
              {localStorage.length-1 != question.id ? (
                <button onClick={handleNext}>Nästa</button>
              ) : (
                <button onClick={() => setOpenModal(true)}>Avsluta test</button>
              )}
            </div>
          </div>
        </div>
      </div>):(<Result correctCount={correctCount} wrongAnswers={wrongAnswers}/>)}
      
      <QuestionModalComponent
        content="Vill du avsluta testet?"
        onClose={() => setOpenModal(!openModal)}
        show={openModal}
        signOut={handleFinishTest}
      ></QuestionModalComponent>
    </>
  );
};

export default Questions;
