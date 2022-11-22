import React, { useState, useEffect, useContext } from "react";
import { getCourseOccasions } from "../../admin/overview/overview.service";
import { TableContext } from "../../context/TableContext";
import CourseOccasionRowItem from "./CourseOccasionRowItem";

const CourseOccasionTable = () => {
  const [courseoccasion, setCourseOccasion] = useState([]);
  const [course, setCourse] = useContext(TableContext);

  async function fetchCourseOccassions() {
    let data = await getCourseOccasions();
    setCourseOccasion(data);
  }
  useEffect(() => {
    fetchCourseOccassions();
  }, []);

  const addOccasion = (selected) => {
    if (selected.remove) {
    //   let updatedCourse = course.forEach((object) => delete object["occasion"]);
    //   setCourse(updatedCourse);
    } else {
      setCourse(() =>
        course.map((object) => {
          return { ...object, occasion: selected.add };
        })
      );
    }
  };
  return (
    <>
      <div className="container">
        <h2>Kurstillfälle</h2>
        <div className="table-container">
          <table className="tables">
            <thead className="thead">
              <tr>
                <th>Kursanordnare</th>
                <th>Kursnamn</th>
                <th>Datum</th>
                <th>Datum</th>
              </tr>
            </thead>
            <tbody>
              {courseoccasion.map((occasion) => (
                <CourseOccasionRowItem
                  addOccasion={addOccasion}
                  key={occasion.id}
                  occasion={occasion}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CourseOccasionTable;
