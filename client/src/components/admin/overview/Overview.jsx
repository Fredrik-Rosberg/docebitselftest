import React, { useState, useEffect, useContext, useMemo } from "react";
import { createCourses } from "./overview.service";
import "./overview.css";
import AccountTable from "../../tables/account-table/AccountTable";
import TestTable from "../../tables/test-table/TestTable";
import CourseOccasionTable from "../../tables/courseoccasion-table/CourseOccasionTable";
import { TableContext } from "../../context/TableContext";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Overview = () => {
  const { course, users, tests, occasion } = useContext(TableContext);
  const [selectedCourse, setSelectedCourse] = course;
  const [selectedOccasion, setSelectedOccasion] = occasion;
  const [selectedUsers, setSelectedUsers] = users;
  const [selectedTests, setSelectedTests] = tests;
  const [courses, setCourses] = useState([]);
  const [rowData, setRowData] = useState([
    {
      user: {
        email: "",
      },
      test: {
        testname: "",
      },
      occasion: {
        courseorganizer: "",
        name: "",
        startdate: "",
        enddate: "",
      },
    },
  ]);

  const [columnDefs] = useState([
    {
      field: "occasion.courseorganizer",
      headerName: "Kursanordnare",
      width: 150,
    },
    { field: "occasion.name", headerName: "Kursnamn", width: 120 },
    { field: "occasion.startdate", headerName: "Datum start", width: 120 },
    { field: "occasion.enddate", headerName: "Datum slut", width: 120 },
    { field: "test.testname", headerName: "Test", width: 120 },
    { field: "user.email", headerName: "Användarnamn", width: 180 },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      sortingOrder: ["asc", "desc"],
    }),
    []
  );

  useEffect(() => {
    console.log(courses);
    console.log(rowData);
  }, [courses]);

  // useEffect(() => {
  //   let result = course.filter(function (course_el) {
  //     return (
  //       courses.filter(function (courses_el) {
  //         if (
  //           courses_el.user == course_el.user &&
  //           courses_el.courseoccasion == course_el.occasion &&
  //           courses_el.test == course_el.test
  //         )
  //           return course_el;
  //       }).length == 0
  //     );
  //   });
  //   console.log(result);
  // }, [courses]);
  const rowSelectionType = "multiple";
  const onSelectionChanged = (event) => {
    //Ska ta bort från courses
  };
  async function handleAddCourse() {
    setCourses(courses.concat(selectedCourse));

    setSelectedCourse([]);
    setSelectedTests({});
    setSelectedUsers({});
    setSelectedOccasion({});
  }

  const saveCourses = async () => {
    await createCourses(courses);
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
        {selectedCourse.length > 0 ? (
          <button className="button" onClick={handleAddCourse}>
            Lägg till rad(er)
          </button>
        ) : (
          <button disabled={true} className="button" onClick={handleAddCourse}>
            Lägg till rad(er)
          </button>
        )}
        <div className="overview-table-course">
          <div className="ag-theme-alpine" style={{ height: 210, width: 700 }}>
            <AgGridReact
              rowData={courses}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowSelection={rowSelectionType}
              onSelectionChanged={onSelectionChanged}
              rowMultiSelectWithClick={true}
              suppressCellFocus={true}
            ></AgGridReact>
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
