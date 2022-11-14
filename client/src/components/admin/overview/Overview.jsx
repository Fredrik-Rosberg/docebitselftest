import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUsers,
  getCourseOccasions,
  getTests,
  getCourses,
} from "./overview.service";
import "./overview.css";

const Overview = () => {
  const [users, setUsers] = useState([]);
  const [tests, setTests] = useState([]);
  const [courseoccasion, setCourseOccasion] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    userId: "",
    courseoccasionId: "",
    testId: "",
  });
  const navigate = useNavigate();

  function handleDoubleClick(id) {
    navigate(`/admin/account/${id}`);
  }
  async function handleClick(id, fieldname) {
    console.log(fieldname);
    setNewCourse({ ...newCourse, [fieldname]: id });
  }
  async function handleAddCourse() {
    
    setCourses((courses) => [...courses, newCourse]);
    console.log(courses);
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
  async function fetchCourses() {
    // let data = await getCourses();
    // setCourses(data);
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
    fetchCourses();
    courseoccasion.map((data) => console.log(data.enddate));
  }, []);
  return (
    <>
      <div className="tables-container">
        <div className="container">
          <h2>Konto</h2>

          <table className="tables">
            <thead>
              <tr>
                <td>Förnamn</td>
                <td>Efternamn</td>
                <td>Användarnamn</td>
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
                    handleClick(user.id, "userId");
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
        <div className="container">
          <h2>Test</h2>

          <table className="tables">
            <thead>
              <tr>
                <td>Test</td>
                <td>Uppladdningsdatum</td>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr
                  className="selected-row"
                  key={test.id}
                  onClick={(e) => {
                    handleClick(test.id, "testId");
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
        <div className="container">
          <h2>Kurstillfälle</h2>

          <table className="tables">
            <thead>
              <tr>
                <td>Kursanordnare</td>
                <td>Kursnamn</td>
                <td>Datum</td>
                <td>Datum</td>
              </tr>
            </thead>
            <tbody>
              {courseoccasion.map((occasion) => (
                <tr
                  className="selected-row"
                  key={occasion.id}
                  onClick={(e) => {
                    handleClick(occasion.id, "courseoccasionId");
                  }}
                >
                  <td>{occasion.courseorganizer}</td>
                  <td>{occasion.name}</td>
                  <td>
                    {new Date(occasion.startdate).toLocaleDateString("se-SE")}
                  </td>
                  <td>
                    {new Date(occasion.enddate).toLocaleDateString("se-SE")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="overview-table-submit">
        {/* <div className="container">
          <table className="tables">
            <thead>
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
                <tr className="selected-row" key={course.id}>
                  <td>{course.courseorganizer}</td>
                  <td>{course.name}</td>
                  <td>
                    {new Date(course.startdate).toLocaleDateString("se-SE")}
                  </td>
                  <td>
                    {new Date(course.enddate).toLocaleDateString("se-SE")}
                  </td>
                  <td>{course.testname}</td>
                  <td>{course.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
        <div>
          <button onClick={handleAddCourse}>Lägg till rader</button>
          <button>Ta bort rader</button>
        </div>
      </div>
    </>
  );
};
export default Overview;
