import React from "react";
import "./questions.css";
import { useTimer } from "react-timer-hook";

export default function UseTimer({ expiryTimestamp }) {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div style={{ textAlign: "center" }}>
      <p>Testtid</p>
      <div className="timershow" style={{ fontSize: "18px" }}>
        {hours > 9 ? <span>{hours}</span>:<span>0{hours}</span>}:
        {minutes > 9 ? <span>{minutes}</span> : <span>0{minutes}</span>}:
        {seconds > 9 ? <span>{seconds}</span> : <span>0{seconds}</span>}
      </div>
    </div>
  );
}
