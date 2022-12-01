import React from "react";
import "./questions.css";
import { useTimer } from "react-timer-hook";

export default function UseTimer({ expiryTimestamp }) {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div className="ralewayweight500" style={{ textAlign: "center" }}>
      <p>Återstående tid:</p>
      <div className="timershow" style={{ fontSize: "18px" }}>
        {hours > 9 ? <span>{hours}</span> : <span>{hours}</span>}:
        {minutes > 9 ? <span>{minutes}</span> : <span>0{minutes}</span>}:
        {seconds > 9 ? <span>{seconds}</span> : <span>0{seconds}</span>}
      </div>
    </div>
  );
}
