import React, { useState, useEffect } from "react";
import "./questions.css";
import { useTimer } from "react-timer-hook";
import UseTimer from "./Timer";
import { BsStar, BsStarFill } from "react-icons/bs";
import QuestionModalComponent from "../../modal/QuestionModal";
import Result from "../result/Result";

const Questions = (props) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 12 * 60);
  const [question, SetQuestion] = useState(JSON.parse(localStorage.getItem(1)));
  const alpha = Array.from(Array(11)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x).toLowerCase());
  const [checked, SetChecked] = useState(Array(11).fill(false));
  const localStorageCount = Array.from(
    { length: localStorage.length - 1 },
    (v, i) => i
  );
  const [starInDropDown, setStarInDropDown] = useState(
    Array(localStorage.length).fill(false)
  );

  const [correctCount, SetCorrectCount] = useState(0);
  const [wrongAnswers, SetWrongAnswers] = useState([{}]);
  const [openModal, setOpenModal] = useState(false);
  const [getToResult, setGetToResult] = useState(false);
  const [facitMode, SetFacitMode] = useState(false);

  useEffect(() => {
    const facitBool = sessionStorage.getItem("facitmode");
    resultHandling();
    if (localStorageCount.length + 1 != sessionStorage.length) {
      sessionStorage.setItem("facitmode", false);
    } else {
      SetFacitMode(facitBool);
    }

    getFromSession(1);

    setFirstQuestion();

    function setFirstQuestion() {
      if (sessionStorage.length == 0) {
        localStorageCount.map((index) =>
          sessionStorage.setItem(index + 1, checked)
        );
      }
    }
    console.log(question);
  }, []);

  useEffect(() => {
    getFromSession(-question.questionnr + 1);
  }, [starInDropDown]);

  function handleNext() {
    let array = Array(11).fill(false);
    SetChecked(array);
    getFromSession(question.questionnr + 1);
    SetQuestion(JSON.parse(localStorage.getItem(question.questionnr + 1)));
    sessionStorage.setItem(question.questionnr, checked);
  }

  function handlePrevious() {
    let array = Array(11).fill(false);
    SetChecked(array);
    getFromSession(question.questionnr - 1);
    SetQuestion(JSON.parse(localStorage.getItem(question.questionnr - 1)));
    sessionStorage.setItem(question.questionnr, checked);
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
    sessionStorage.setItem(question.questionnr, checked);
  }

  async function handleLastQuestion() {
    let array = Array(11).fill(false);
    SetChecked(array);
    sessionStorage.setItem(question.questionnr, checked);
  }

  function handleAbort() {}
  let cleanUpArr=[];
  async function resultHandling() {
    const resultarray = localStorageCount.map((item) => [
      sessionStorage.getItem(item + 1),
    ]);
    console.log(resultarray[0][0])
    if(resultarray[0][0]!=null){ let array1 = resultarray.map((item) =>
      item.map((item2) => item2.split(","))
    );

    let array2 = array1.map((item) =>
      item.map((item2) =>
        item2.map((item3, index) =>
          item3 == "true"
            ? (item3 = String.fromCharCode(97 + index).toUpperCase())
            : (item3 = false)
        )
      )
    );

    cleanUpArr = array2.map((item) =>
      item.map((item2) => item2.filter(Boolean))
    );}
   

    //get all questions
    let questionArray = localStorageCount.map((item) =>
      JSON.parse(localStorage.getItem(item + 1))
    );

    console.log(questionArray);

    let correctAnswerArray = questionArray.map((item) => [
      item.answer.toUpperCase(),
    ]);

    let correctAnswerArray2 = correctAnswerArray.map((item) =>
      item.map((item) => item.split(","))
    );
    console.log(correctAnswerArray);

    //Jämföra rätt svar med angivna svar
    let correctAnswerCount = 0;
    let wrongAnswersArray = [];

    localStorageCount.map((index) =>
      JSON.stringify(cleanUpArr[index]) ===
      JSON.stringify(correctAnswerArray2[index])
        ? (wrongAnswersArray.push([
            index,
            cleanUpArr[index],
            correctAnswerArray2[index],
          ]),
          (correctAnswerCount += 1))
        : wrongAnswersArray.push([
            index,
            cleanUpArr[index],
            correctAnswerArray2[index],
          ])
    );
    console.log(wrongAnswersArray);
    SetCorrectCount(correctAnswerCount);
    SetWrongAnswers(wrongAnswersArray);
  }

  async function handleFinishTest() {
    await handleLastQuestion();
    await resultHandling();

    //get all results unfinished

    //Hantera modal och navigering
    sessionStorage.setItem("facitmode", "true");
    setGetToResult(true);
    setOpenModal(false);
    console.log(wrongAnswers);
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
    array[question.questionnr - 1] = !array[question.questionnr - 1];
    array.map((item) =>
      item != true || item != false ? (item = false) : (item = item)
    );

    setStarInDropDown(array);
  };
  function setCorrectColor(answeritem) {
    let answerArray = question["answer"].split(",");
    let cssBool = false;
    answerArray.map((item) => {
      console.log(item);
      if (item == answeritem) {
        cssBool = true;
      } 
    });
    return cssBool;
  }

  return (
    <>
      {!getToResult ? (
        <div className="questionsmain">
          <p></p>
          <p>{useTimer.onExpire}</p>
          <div>
            {!facitMode ? <UseTimer expiryTimestamp={time} /> : ""}
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
              {starInDropDown[question.questionnr - 1] ? (
                <BsStarFill className="handlestar" onClick={handleStar} />
              ) : (
                <BsStar className="handlestar" onClick={handleStar} />
              )}
              <div className="questionsblockinner">
                <h3 className="questionnumber ralewayweight500">
                  Fråga {question.questionnr}
                </h3>
                <div className="question setfontsize">{question.question}</div>
                <div className="setfontsize choosetext">
                  Välj ett eller flera av svaren nedan
                </div>
                <div className="questionscrollcontainer setfontsize">
                  {alphabet.map((item, index) =>
                    question["alternative" + item] != "" ? (
                      <div
                        key={index}
                        className={
                          facitMode
                            ? setCorrectColor(item)
                              ? "questiongrid answercolor"
                              : "questiongrid"
                            : "questiongrid"
                        }
                      >
                        <input
                          disabled={facitMode ? true : false}
                          checked={checked[index]}
                          value={item}
                          onChange={() => handleChecked(index)}
                          type="checkbox"
                        ></input>
                        <label>{question["alternative" + item]}</label>
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
                ) : facitMode ? (
                  ""
                ) : (
                  <button onClick={handlePrevious}>Föregående</button>
                )}
              </div>
              <div>
                {facitMode ? (
                  <button onClick={() => setGetToResult(true)}>
                    Tillbaka till resultat
                  </button>
                ) : (
                  <button onClick={handleAbort}>Avbryt</button>
                )}
              </div>

              <div>
                {localStorage.length - 1 != question.id ? (
                  facitMode ? (
                    ""
                  ) : facitMode ? (
                    ""
                  ) : (
                    <button onClick={handleNext}>Nästa</button>
                  )
                ) : facitMode ? (
                  ""
                ) : (
                  <button onClick={() => setOpenModal(true)}>
                    Avsluta test
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Result
          correctCount={correctCount}
          wrongAnswers={wrongAnswers}
          resultBool={setGetToResult}
          questionnr={SetQuestion}
          checkedChoice={SetChecked}
          setfacit={SetFacitMode}
        />
      )}

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
