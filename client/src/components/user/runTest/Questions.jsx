import React from "react";
import "./questions.css";
import { useTimer } from "react-timer-hook";
import UseTimer from "./Timer";

const Questions = (props) => {




  const time = new Date();
  time.setSeconds(time.getSeconds() + props.testtime*60);
  return (
    <>
      <div className="questionsmain">
        <p>1</p>
        <p>{useTimer.onExpire}</p>
        <div>
          <UseTimer expiryTimestamp={time} />
        </div>
        <div className="questionscontainer">
          <div className="questionsblock"></div>
          <div className="questionsbuttons">
            <div>
              <button>Föregående</button>
            </div>
            <div>
              <button>avbryt</button>
            </div>
            <div>
              <button>Nästa</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions;
