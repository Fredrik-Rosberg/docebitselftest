import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { deleteCourse } from "./overview.service";
import "../tables/tables.css";
import AccountTable from "../tables/AccountTable";
import TestTable from "../tables/TestTable";
import CourseOccasionTable from "../tables/CourseOccasionTable";
import { getCourses } from "./overview.service";
import { TableContext } from "../../context/TableContext";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Overview = () => {
  const accountRef = useRef();
  const testRef = useRef();
  const occasionRef = useRef();
  const { deselect } = useContext(TableContext);
  const [deselectAll, setDeselectAll] = deselect;
  const [courses, setCourses] = useState([]);
  const gridRef = useRef();

  const [rowData, setRowData] = useState([]);

  const [columnDefs] = useState([
    {
      field: "courseorganizer",
      headerName: "Kursanordnare",
      width: 126,
    },
    { field: "name", headerName: "Kursnamn", width: 120 },
    { field: "startdate", headerName: "Startdatum", width: 120 },
    { field: "enddate", headerName: "Slutdatum", width: 120 },
    { field: "testname", headerName: "Test", width: 130 },
    { field: "email", headerName: "Användarnamn", width: 214 },
  ]);
  useEffect(() => {
    const getCours = async () => {
      let data = await getCourses();
      if (!data.message) {
        setRowData(data);
      }
    };
    getCours();
  }, []);

  const defaultColDef = useMemo(
    () => ({
      resizable: true,

      sortable: true,
      sortingOrder: ["asc", "desc", "null"],
    }),
    []
  );
  const removeFromChildArray = (reference) => {
    reference.current.removeFromArray();
  };

  useEffect(() => {
    setDeselectAll(false);
  }, [courses]);

  const rowSelectionType = "multiple";

  const onRemoveSelected = useCallback(() => {
    const deleteCourseFromTable = async (data) => {
      let result = await deleteCourse(data);
      return result;
    };
    const selectedData = gridRef.current.api.getSelectedRows();
    let result = deleteCourseFromTable(selectedData);
    gridRef.current.api.applyTransaction({ remove: selectedData });
  }, []);

  return (
    <>
      <div className="overview-main">
        <div className="overview-tables">
          <AccountTable ref={accountRef} rowSelectionType={"single"} />
          <TestTable ref={testRef} />
          <CourseOccasionTable ref={occasionRef} />
        </div>
        <div className="overview-buttons">
          <button
            className="form-button admin-main-button"
            onClick={() => removeFromChildArray(accountRef)}
          >
            Ta bort konto(n)
          </button>{" "}
          <button
            className="form-button admin-main-button"
            onClick={() => removeFromChildArray(testRef)}
          >
            Ta bort test
          </button>{" "}
          <button
            className="form-button admin-main-button"
            onClick={() => removeFromChildArray(occasionRef)}
          >
            Ta bort kurstillfälle
          </button>
        </div>
        <div className="course-table">
          <div
            className="ag-theme-alpine"
            style={{ height: 220, width: 832, fontFamily: "Raleway" }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              rowSelection={rowSelectionType}
              suppressCellFocus={true}
              overlayNoRowsTemplate={"Inga kurser funna"}
              overlayLoadingTemplate={"loading"}
            ></AgGridReact>
          </div>{" "}
          <button onClick={onRemoveSelected} className="form-button">
            Ta bort kurs
          </button>
          <button className="form-button">Spara</button>

        </div>
      </div>
    </>
  );
};
export default Overview;
