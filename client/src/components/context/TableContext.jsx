import React, { useState, useEffect } from "react";

export const TableContext = React.createContext();

export default function GlobalContextProvider(props) {
  const [course, setCourse] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTests, setSelectedTests] = useState({});
  const [selectedOccasion, setSelectedOccasion] = useState({});
  const [deselectAll, setDeselectAll] = useState(false);
  useEffect(() => {
    if (
      Object.keys(selectedTests || {}).length !== 0 &&
      Object.keys(selectedOccasion || {}).length !== 0 &&
      selectedUsers.length > 0
    ) {
      setCourse([]);
      selectedUsers.map((element) =>
        setCourse((course) => [
          ...course,
          {
            user: element,
            test: selectedTests,
            occasion: selectedOccasion,
          },
        ])
      );
    } else {
      setCourse([]);
    }
  }, [selectedUsers, selectedTests, selectedOccasion]);

  //Lägga till i listan om man unselectar


  return (
    <TableContext.Provider
      value={{
        course: [course, setCourse],
        users: [selectedUsers, setSelectedUsers],
        tests: [selectedTests, setSelectedTests],
        occasion: [selectedOccasion, setSelectedOccasion],
        deselect: [deselectAll, setDeselectAll],
      }}
    >
      {props.children}
    </TableContext.Provider>
  );
}
