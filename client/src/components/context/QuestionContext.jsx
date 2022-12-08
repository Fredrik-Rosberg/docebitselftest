import React, { useState, createContext } from "react";

export const QuestionContext = createContext();

export default function GlobalContextProv(props) {
  const [questions, setQuestions] = useState([]);
  return (
    <QuestionContext.Provider value={[questions, setQuestions]}>
      {props.children}
    </QuestionContext.Provider>
  );
}
