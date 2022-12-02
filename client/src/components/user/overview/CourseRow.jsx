import React from "react";
import "./overviewUser.css";
const CourseRow = (props) => {
  const data = props.data;
  return (
    <>
      {" "}
      <div className="overview-row">
        <h2>Kurs: CPREFL</h2>
        <div className="overview-row-header">
          <h2>Kursanordnare: NFI</h2>
          <h2>Slutdatum: 2022-08-25</h2>
        </div>
        <p>Antal genomförda tester: 2 </p>
        <div className="overview-table">{data.id}</div>
      </div>
    </>
  );
};

export default CourseRow;
