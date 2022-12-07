import React, { useState, useEffect } from "react";
import "./overviewUser.css";
import CourseRow from "./CourseRow";
import { getCourseByUserId, getUserById } from "./overview.user.service";
const OverviewUser = () => {
  const [courses, setCourses] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      let id = localStorage.getItem("user");
      let data = await getCourseByUserId(id);
      setCourses(data);
    };
    const fetchUser = async () => {
      let id = localStorage.getItem("user");
      let username = await getUserById(id);
      setUsername(username);
    };
    fetchUser();
    fetchCourses();
  }, []);

  return (
    <>
      <div className="overview-user-container">
        <div className="overview-header">
          <h2>Översikt</h2>
          <h2>
            {username ? `${username.firstname} ${username.lastname}` : ""}
          </h2>
        </div>
        {courses?.map((obj) => (
          <div key={obj.id + Math.random()} className="overview-row">
            <h2>Kurs: {obj.name}</h2>
            <div className="overview-row-header">
              <h2>Kursanordnare: {obj.courseorganizer}</h2>
              <h2>Datum: {`${obj.startdate} - ${obj.enddate}`}</h2>
            </div>
            <CourseRow id={obj.id} />
          </div>
        ))}
      </div>
    </>
  );
};

export default OverviewUser;
