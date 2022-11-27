import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useRef,
  useCallback,
} from "react";
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
  const { course, deselect } = useContext(TableContext);
  const [selectedCourse, setSelectedCourse] = course;
  const [deselectAll, setDeselectAll] = deselect;
  const [courses, setCourses] = useState([]);
  const result = [...new Set([...courses, ...selectedCourse])]
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
  const gridRef = useRef();
  const [columnDefs] = useState([
    {
      field: "occasion.courseorganizer",
      headerName: "Kursanordnare",
      width: 150,
    },
    { field: "occasion.name", headerName: "Kursnamn", width: 120 },
    { field: "occasion.startdate", headerName: "Startdatum", width: 120 },
    { field: "occasion.enddate", headerName: "Slutdatum", width: 120 },
    { field: "test.testname", headerName: "Test", width: 120 },
    { field: "user.email", headerName: "Användarnamn", width: 180 },
  ]);
  const uniqueValuesSet = new Set();

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      sortingOrder: ["asc", "desc"],
    }),
    []
  );

  useEffect(() => {
    setDeselectAll(false);
  }, [courses]);

  useEffect(() => {}, [course]);

  const rowSelectionType = "multiple";
  const onSelectionChanged = (event) => {
    //Ska ta bort från courses
  };

  // const filteredArr = courses.filter((obj) => {
  //   // check if name property value is already in the set
  //   const isPresentInSet = uniqueValuesSet.has(obj.user && obj.test && obj.occasion);

  //   // add name property value to Set
  //   uniqueValuesSet.add(obj);

  //   // return the negated value of
  //   // isPresentInSet variable
  //   return !isPresentInSet;
  // });
  async function handleAddCourse() {
    // filteredArr;
    // console.log(uniqueValuesSet)
    // let res =courses.concat(selectedCourse)
    // let result = res.filter(function (course_el) {
    //   return (
    //     selectedCourse.filter(function (courses_el) {
    //       if (
    //         !courses_el.user.id == course_el.user.id &&
    //         courses_el.courseoccasion.id !== course_el.occasion.id &&
    //         courses_el.test.id !== course_el.test.id
    //       )
    //         return course_el;
    //     }).length == 0
    //   );
    // });
  
    setCourses(result);
    setDeselectAll(true);
    setSelectedCourse([]);
  }
  const onRemoveSelected = useCallback(() => {
    const selectedData = gridRef.current.api.getSelectedRows();
    const res = gridRef.current.api.applyTransaction({ remove: selectedData });
  }, []);
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
          <div
            className="ag-theme-alpine"
            style={{ height: 210, width: 830, fontFamily: "Raleway" }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={courses}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowSelection={rowSelectionType}
              onSelectionChanged={onSelectionChanged}
              rowMultiSelectWithClick={true}
              suppressCellFocus={true}
            ></AgGridReact>
          </div>
          <button className="button" onClick={onRemoveSelected}>
            Ta bort rad(er)
          </button>
        </div>
        <button onClick={saveCourses} className="button">
          Spara kurser
        </button>
      </div>
    </>
  );
};
export default Overview;
