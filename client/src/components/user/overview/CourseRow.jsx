import React, { useEffect } from "react";
import "./overviewUser.css";
const CourseRow = (props) => {
  const data = props.data;
  useEffect(() => {}, []);

  return (
    <>
      {" "}
      <div className="overview-row">
        <h2>Kurs: {data.name}</h2>
        <div className="overview-row-header">
          <h2>Kursanordnare: {data.courseorganizer}</h2>
          <h2>Datum: {`${data.startdate} - ${data.enddate}`}</h2>
        </div>
        <p>Antal genomförda tester: {data.length} </p>
        <div className="overview-table">
          <table>
            <thead>
              <tr>
                <th>Genomfört</th>
                <th>Resultat</th>
                <th>Maxpoäng</th>
                <th>Godkänd</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.testname}</td>
                <td> {data.score}</td>
                <td>{data.maxscore}</td>
                <td>
                  {data.score / data.maxscore >= 0.7 ? "Godkänd" : "Ej godkänd"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CourseRow;
