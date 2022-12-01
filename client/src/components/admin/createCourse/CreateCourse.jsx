import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useRef,
  useCallback,
} from "react";
import "../tables/tables.css";
import { createCourses } from "./createCourse.service.js";
import AccountTable from "../tables/AccountTable.jsx";
import TestTable from "../tables/TestTable";
import CourseOccasionTable from "../tables/CourseOccasionTable";
import { TableContext } from "../../context/TableContext";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Course = () => {
  const { course, deselect } = useContext(TableContext);
  const [selectedCourse, setSelectedCourse] = course;
  const [deselectAll, setDeselectAll] = deselect;
  const [courses, setCourses] = useState([]);
  const result = [...new Set([...courses, ...selectedCourse])];
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessages, setShowErrorMessages] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
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
    { field: "test.testname", headerName: "Test", width: 130 },
    { field: "user.email", headerName: "Användarnamn", width: 214 },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      sortingOrder: ["asc", "desc", "null"],
    }),
    []
  );

  useEffect(() => {
    setDeselectAll(false);
  }, [courses]);

  const rowSelectionType = "multiple";

  async function handleAddCourse() {
    const uniqueIds = new Set();
    let concatenatedArray = courses.concat(selectedCourse);
    const unique = concatenatedArray.filter((element) => {
      const isDuplicate = uniqueIds.has(element.id);
      uniqueIds.add(element.id);
      if (!isDuplicate) {
        return true;
      }
      return false;
    });

    setCourses(unique);
    setDeselectAll(true);
    setSelectedCourse([]);
  }
  const onRemoveSelected = useCallback(() => {
    const selectedData = gridRef.current.api.getSelectedRows();
    const res = gridRef.current.api.applyTransaction({ remove: selectedData });
  }, []);
  const getRowId = useMemo(() => {
    return (params) => params.data.userid && params.data.testid && params.data.coursceoccasionid;
  }, []);
  const saveCourses = async () => {
    let result = await createCourses(courses);
    if (result.message) {
      setMessage(result.message);
      setShowMessages(true);
      setCourses([]);
    } else if (result.error) {
      console.log(result.error);
      setErrorMessage(result.error);
      setShowErrorMessages(true);
    }
  };
  return (
    <>
      <div className="overview-main">
        <div className="overview-tables">
          <AccountTable rowSelectionType={"multiple"} />
          <TestTable />
          <CourseOccasionTable />
        </div>
        {selectedCourse.length > 0 ? (
          <button className="form-button" onClick={handleAddCourse}>
            Lägg till rad(er)
          </button>
        ) : (
          <button
            disabled={true}
            className="form-button"
            onClick={handleAddCourse}
          >
            Lägg till rad(er)
          </button>
        )}
        <div className="course-table">
          <div
            className="ag-theme-alpine"
            style={{ height: 220, width: 832, fontFamily: "Raleway" }}
          >
            <AgGridReact
            getRowId={getRowId}
              ref={gridRef}
              rowData={courses}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowSelection={rowSelectionType}
              rowMultiSelectWithClick={true}
              suppressCellFocus={true}
              overlayNoRowsTemplate={"Lägg till kurser"}
            ></AgGridReact>
          </div>
          <button className="form-button" onClick={onRemoveSelected}>
            Ta bort rad(er)
          </button>
        </div>
        <div>
          <button onClick={saveCourses} className="form-button">
            Spara kurser
          </button>
          <div className="messages">
            {showMessages && (
              <>
                <p className="success-message">{message}</p>
              </>
            )}
            {showErrorMessages && (
              <>
                <p className="error-message">{errorMessage}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Course;
