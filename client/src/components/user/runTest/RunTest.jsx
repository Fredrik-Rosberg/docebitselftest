import React, { useContext }from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { QuestionContext } from "../../context/QuestionContext";

import "./runTest.css";
import { getQuestionsById } from "./runTest.service";


const RunTest = (props) => {
  
  const [questions, SetQuestions] = useState([]);
  const [time, SetTime]=useContext(QuestionContext)
  
  useEffect(() => {

    async function getQuestions() { 
      var questions = await getQuestionsById(props.testid);
      SetQuestions(questions);
    }
    getQuestions()
   

  }, []);

  function handleSubmit(){
     SetTime(props)
    
    questions.map((items)=>(localStorage.setItem(items.questionnr, JSON.stringify(items), console.log(items))))
    
  }

  console.log(questions)


  return (
    <>
      <div className="runtestmain">
        <div>
          <h2 className="runtestheader">Övningstest i Kursnamn</h2>
        </div>
        <div className="runtestinfo">
          Följande test är avsett till att testa av dina kunskaper och förbereda
          dig för en evetuell certifiering.
          <br /> <br />
          Varje övning består av en fråga med ett eller flera svarsalternativ.
          På vissa frågor är mer än ett alternativ rätt och samtliga rätta
          alternativ behöver markeras för att frågan ska bli godkänd.
          <br /> Du kan välja att hoppa över en fråga för att sedan gå tillbaka
          till denna senare.
          <br /> Har du inte besvarat en fråga när tiden har passerat så får du
          inga poäng på frågan.
          <br /> Du kan när som helst välja att avsluta ett test. <br />
          <br />
          För att bli godkänd behöver du ha minst 70% rätt på testet.
        </div>

        <Link to={`/user/test/questionform/`}>
          <div className="runtestbutton">
            <button onClick={handleSubmit}>Starta test</button>
          </div>
        </Link>
      </div>
      
      
    </>
  );
};

export default RunTest;
