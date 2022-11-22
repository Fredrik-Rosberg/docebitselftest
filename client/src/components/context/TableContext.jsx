import React, { useState } from "react";

export const TableContext = React.createContext();

export default function GlobalContextProvider(props) {
  const [course, setCourse] = useState([]);
  return (
    <TableContext.Provider value={[course, setCourse]}>{props.children}</TableContext.Provider>
  );
}
