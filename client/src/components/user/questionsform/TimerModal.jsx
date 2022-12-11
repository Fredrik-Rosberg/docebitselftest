import React from "react";
import "./questions.css";
import { useTimer } from "react-timer-hook";

export default function UseTimer({ expiryTimestamp, onmodalwarning }) {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onmodalwarning,
    onExpire: onmodalwarning,
  });

  return (
    <></>
  );
}
