import React, { useState, useEffect, useContext, useMemo } from "react";
import { getCourseOccasions } from "../../admin/overview/overview.service";
import { TableContext } from "../../context/TableContext";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const CourseOccasionTable = () => {
  const { occasion } = useContext(TableContext);
  // const [course, setCourse] = useContext(TableContext);
  const [selectedOccasion, setSelectedOccasion] = occasion;
  const [rowData, setRowData] = useState([
    { courseorganizer: "", name: "", startdate: "", enddate: "" },
  ]);

  const [columnDefs] = useState([
    { field: "courseorganizer", headerName: "Kursanordnare", width: 110 },
    { field: "name", headerName: "Kursnamn", width: 100 },
    { field: "startdate", headerName: "Datum", width: 100 },
    { field: "enddate", headerName: "Datum", width: 100 },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  );

  const setDateFormatOnArray = (data) => {
    data.map((obj) => {
      obj.startdate = new Date(obj.startdate).toLocaleDateString("se-SE");
      obj.enddate = new Date(obj.enddate).toLocaleDateString("se-SE");
    });
    return data;
  };

  useEffect(() => {
    async function fetchCourseOccassions() {
      let data = await getCourseOccasions();
      data = await setDateFormatOnArray(data);
      setRowData(data);
    }
    fetchCourseOccassions();
  }, []);
  const rowSelectionType = "single";
  const onSelectionChanged = (event) => {
    setSelectedOccasion(event.api.getSelectedRows()[0]);
  };

  return (
    <>
      <div className="container">
        <h2>Kurstillfälle</h2>
        <div className="ag-theme-alpine" style={{ height: 210, width: 450 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection={rowSelectionType}
            onSelectionChanged={onSelectionChanged}
            rowMultiSelectWithClick={true}
            suppressCellFocus={true}
          ></AgGridReact>
        </div>
      </div>
    </>
  );
};

export default CourseOccasionTable;
