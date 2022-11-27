import React, { useState, useEffect, useContext, useMemo } from "react";
import { getCourseOccasions } from "../../admin/overview/overview.service";
import { TableContext } from "../../context/TableContext";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const CourseOccasionTable = () => {
  const { occasion, deselect } = useContext(TableContext);
  const [selectedOccasion, setSelectedOccasion] = occasion;
  const [deselectAll, setDeselectAll] = deselect;
  const [event, setEvent] = useState({});
  const [rowData, setRowData] = useState([
    { courseorganizer: "", name: "", startdate: "", enddate: "" },
  ]);

  const [columnDefs] = useState([
    { field: "courseorganizer", headerName: "Kursanordnare", width: 110 },
    { field: "name", headerName: "Kursnamn", width: 100 },
    { field: "startdate", headerName: "Startdatum", width: 100 },
    { field: "enddate", headerName: "Slutdatum", width: 100 },
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
  useEffect(() => {
    const onSelectionChanged = (event) => {
      if (deselectAll) {
        event.api.deselectAll();
        setDeselectAll(false);
        setSelectedOccasion({});
      }
    };
    onSelectionChanged(event);
  }, [deselectAll]);
  const onSelectionChanged = (event) => {
    setSelectedOccasion(event.api.getSelectedRows()[0]);
    setEvent(event);
  };

  return (
    <>
      <div className="container">
        <h2>Kurstillfälle</h2>
        <div
          className="ag-theme-alpine"
          style={{ height: 210, width: 450, fontFamily: "Raleway" }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection={rowSelectionType}
            onSelectionChanged={onSelectionChanged}
            suppressCellFocus={true}
            rowMultiSelectWithClick={true}
          ></AgGridReact>
        </div>
      </div>
    </>
  );
};

export default CourseOccasionTable;
