import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUsers,
  getCourseOccasions,
  getTests,
  createCourses,
} from "./overview.service";
import "./overview.css";

const Overview = () => {
  const [users, setUsers] = useState([]);
  const [tests, setTests] = useState([]);
  const [courseoccasion, setCourseOccasion] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({});
  const [newArray, setNewArray] = useState([]);

  const navigate = useNavigate();

  const updateState = (id, fieldname) => {
    const newState = newArray.map((obj) => {
      return { ...obj, [fieldname]: id };
    });

    setNewArray(newState);
  };

  function handleDoubleClick(id) {
    navigate(`/admin/account/${id}`);
  }

  async function handleAddToNewCourse(id, fieldname) {
    updateState(id, fieldname);
    console.log(newArray);
  }
  async function handleAddCourse() {
    
    setCourses(courses.concat(newArray));
    setNewArray([]);
  }
  async function fetchUsers() {
    let data = await getUsers();
    console.log(data);
    setUsers(data);
  }
  async function fetchTests() {
    let data = await getTests();
    setTests(data);
  }

  async function fetchCourseOccassions() {
    let data = await getCourseOccasions();

    setCourseOccasion(data);
    console.log(data);
  }
  useEffect(() => {
    fetchUsers();
    fetchTests();
    fetchCourseOccassions();
    courseoccasion.map((data) => console.log(data.enddate));
  }, []);

  async function saveCourses() {
    let response = await createCourses(courses);
    console.log(response);
    setCourses([]);
    setNewCourse({});
  }
  return (
    <>
      <div className="overview-main">
        <div className="overview-tables">
          <div className="container">
            <h2>Konto</h2>
            <div className="table-container">
              <table className="tables">
                <thead className="thead">
                  <tr>
                    <th>Förnamn</th>
                    <th>Efternamn</th>
                    <th>Användarnamn</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      className="selected-row"
                      key={user.id}
                      onDoubleClick={(e) => {
                        handleDoubleClick(user.id);
                      }}
                      onClick={(e) => {
                        setNewArray((newArray) => [
                          ...newArray,
                          { user: user },
                        ]);
                      }}
                    >
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
                    <tr
                      className="selected-row"
                      key={test.id}
                      onClick={(e) => {
                        updateState(test, "test");
                      }}
                    >
                      <td>{test.testname}</td>
                      <td>
                        {new Date(test.uploaddate).toLocaleDateString("se-SE")}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                  {/* <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>

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
                    <tr
                      className="selected-row"
                      key={occasion.id}
                      onClick={(e) => {
                        updateState(occasion, "courseoccasion");
                      }}
                    >
                      <td>{occasion.courseorganizer}</td>
                      <td>{occasion.name}</td>
                      <td>
                        {new Date(occasion.startdate).toLocaleDateString(
                          "se-SE"
                        )}
                      </td>
                      <td>
                        {new Date(occasion.enddate).toLocaleDateString("se-SE")}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button className="button" onClick={handleAddCourse}>
          Lägg till rad(er)
        </button>

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
                    <td>{course.courseoccasion.courseorganizer}</td>
                    <td>{course.courseoccasion.name}</td>
                    <td>
                      {new Date(
                        course.courseoccasion.startdate
                      ).toLocaleDateString("se-SE")}
                    </td>
                    <td>
                      {new Date(
                        course.courseoccasion.enddate
                      ).toLocaleDateString("se-SE")}
                    </td>
                    <td>{course.test.testname}</td>
                    <td>{course.user.email}</td>
                  </tr>
                ))}
              </tbody>
              {/* <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>{" "}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>{" "}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>{" "}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>{" "}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr> */}
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
