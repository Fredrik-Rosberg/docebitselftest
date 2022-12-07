import React, { useEffect, useState } from "react";
import { getResultsByCourseId } from "./overview.user.service";
import "./overviewUser.css";
const CourseRow = (props) => {
  const id = props.id;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getResults = async () => {
      let result = await getResultsByCourseId(id);
      setData(result);
      setLoading(false);
    };
    getResults();
  }, [id]);

  return (
    <>
      <div className="overview-user-results">
        {data <= 0 ? (
          <p>Antal genomförda tester: 0</p>
        ) : (
          <>
            <p>Antal genomförda tester: {data?.length} </p>
            <div className="overview-table">
              <table>
                <thead className="overview-table-head">
                  <tr className="overview-table-border">
                    <th>Genomfört</th>
                    <th>Tid</th>
                    <th>Dina poäng</th>
                    <th>Maxpoäng</th>
                    <th>Resultat</th>
                  </tr>
                </thead>
                <tbody className="overview-table-body">
                  {data?.map((obj) => (
                    <tr key={Math.random()} className="overview-table-border">
                      <td>{obj.testname}</td>
                      <td>{obj?.time > 0 ? obj.time + "min" : "Utan tid"}</td>
                      <td> {obj.score}</td>
                      <td>{obj.maxscore}</td>
                      <td>
                        {obj.score / obj.maxscore >= 0.7
                          ? "Godkänd"
                          : "Ej godkänd"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CourseRow;
