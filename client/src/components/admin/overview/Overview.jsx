import React, { useState, useEffect, useContext } from "react";
import { createCourses } from "./overview.service";
import "./overview.css";
import AccountTable from "../../tables/account-table/AccountTable";
import TestTable from "../../tables/test-table/TestTable";
import CourseOccasionTable from "../../tables/courseoccasion-table/CourseOccasionTable";
import { TableContext } from "../../context/TableContext";

const Overview = () => {
  const [course, setCourse] = useContext(TableContext);
  const [courses, setCourses] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);

  useEffect(() => {
    let arrayToDisableButton = course.filter(function (course_el) {
      return (
        courses.filter(function (courses_el) {
          return (
            courses_el.user == course_el.user &&
            courses_el.courseoccasion == course_el.occasion &&
            courses_el.test == course_el.test
          );
        }).length == 0
      );
    });

    async function setFilterArray() {
      setFilteredArray(
        course.filter((element) => {
          if (element.test && element.occasion) {
            return element;
          }
        })
      );
    }
    setFilterArray();
  }, [course]);

  async function handleAddCourse() {
    setCourses(courses.concat(filteredArray));
    setFilteredArray([]);
    setCourse([]);
  }

  const saveCourses = async () => {
    console.log("hello");

    let response = await createCourses(courses);
    console.log(response);
    setCourses([]);
  };
  return (
    <>
      <div className="overview-main">
        <div className="overview-tables">
          <AccountTable />
          <TestTable />
          <CourseOccasionTable />
        </div>
        {filteredArray.length > 0 ? (
          <button className="button" onClick={handleAddCourse}>
            Lägg till rad(er)
          </button>
        ) : (
          <button disabled={true} className="button" onClick={handleAddCourse}>
            Lägg till rad(er)
          </button>
        )}

        <div className="overview-table-course">
          <div className="table-container">
            <table className="tables">
              <thead className="thead">
                <tr>
                  <td>Kursanordnare</td>
                  <td>Kursnamn</td>
                  <td>Kursstart</td>
                  <td>Kursslut</td>
                  <td>Test</td>
                  <td>Användarnamn</td>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr
                    className="selected-row"
                    key={course.user.id + Math.random()}
                  >
                    <td>{course.occasion.courseorganizer}</td>
                    <td>{course.occasion.name}</td>
                    <td>
                      {new Date(course.occasion.startdate).toLocaleDateString(
                        "se-SE"
                      )}
                    </td>
                    <td>
                      {new Date(course.occasion.enddate).toLocaleDateString(
                        "se-SE"
                      )}
                    </td>
                    <td>{course.test.testname}</td>
                    <td>{course.user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="button">Ta bort rad(er)</button>
        </div>
        <button onClick={saveCourses} className="button">
          Spara kurser
        </button>
      </div>
    </>
  );
};
export default Overview;
