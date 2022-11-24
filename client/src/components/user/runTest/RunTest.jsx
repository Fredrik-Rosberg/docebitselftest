import React from "react";
import { useState } from "react";
import Questions from "./Questions";
import "./runTest.css";

const RunTest = (props) => {
  const [startTest, SetStartTest] = useState(false);
  console.log(props);
  return (
    <>
      {startTest ? (
        <Questions testid={props.id} testtime={props.testtime} />
      ) : (
        <div className="runtestmain">
          <div>
            <h2 className="runtestheader">Övningstest i Kursnamn</h2>
          </div>
          <div className="runtestinfo">
            Följande test är avsett till att testa av dina kunskaper och
            förbereda dig för en evetuell certifiering.
            <br /> <br />
            Varje övning består av en fråga med ett eller flera svarsalternativ.
            På vissa frågor är mer än ett alternativ rätt och samtliga rätta
            alternativ behöver markeras för att frågan ska bli godkänd.
            <br /> Du kan välja att hoppa över en fråga för att sedan gå
            tillbaka till denna senare.
            <br /> Har du inte besvarat en fråga när tiden har passerat så får
            du inga poäng på frågan.
            <br /> Du kan när som helst välja att avsluta ett test. <br />
            <br />
            För att bli godkänd behöver du ha minst 70% rätt på testet.
          </div>
          <div className="runtestbutton">
            <button onClick={() => SetStartTest(true)}>Starta test</button>
          </div>
        </div>
      )}
    </>
  );
};

export default RunTest;
