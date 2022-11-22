import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { getTests } from "../../admin/overview/overview.service";

import TestRowItem from "./TestRowItem";
import { TableContext } from "../../context/TableContext";

const TestTable = () => {
  const [course, setCourse] = useContext(TableContext);
  const [tests, setTests] = useState([]);

  //Hämtar valt test från childcomponent, kollar om det är markerat och lägger till selectedUsers
  //annars tas det bort från listan.
  const addTest = (selectedTest) => {
    if (selectedTest.remove) {
      course.forEach((object) => delete object["test"]);
      setCourse(course);
    } else {
      setCourse(() =>
        course.map((object) => {
          return { ...object, test: selectedTest.add };
        })
      );
    }
  };

  //Hämtar alla test
  useEffect(() => {
    async function fetchTests() {
      let data = await getTests();
      setTests(data);
    }
    fetchTests();
  }, []);

  return (
    <>
      <div className="container">
        <h2>Test</h2>
        <div className="table-container">
          <table className="tables">
            <thead className="thead">
              <tr>
                <th>Test</th>
                <th>Uppladdningsdatum</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <TestRowItem addTest={addTest} key={test.id} test={test} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TestTable;
