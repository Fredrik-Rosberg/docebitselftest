import React, { useState, useEffect } from "react";
import "./overviewUser.css";
import CourseRow from "./CourseRow";
import { getCourseByUserId } from "./overview.user.service";
const OverviewUser = () => {
  const [courses, setCourses] = useState(null);
  const [userId, setUserId] = useState(50);
  //   useEffect(() => {
  //     setUserId(localStorage.getItem("userId"));
  //   }, []);
  useEffect(() => {
    const fetchCourses = async () => {
      console.log(userId);
      let data = await getCourseByUserId(userId);
      setCourses(data.data);
    };
    console.log(courses)
    fetchCourses();
    console.log(courses)

  }, [userId]);

  return (
    <>
      <div className="overview-user-container">
        <div className="overview-header">
          <h2>Översikt</h2>
          <h2>Louise Rosengren</h2>
        </div>
        {courses?.map((obj) => (
          <CourseRow key={obj.id} data={obj} />
        ))}
      </div>
    </>
  );
};

export default OverviewUser;
