import React, { useState, useEffect, useContext, useMemo, useRef } from "react";
import useFetch from "../../../hooks/useFetch";
import { getCourseOccasions } from "../overview/overview.service";
import { TableContext } from "../../context/TableContext";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const CourseOccasionTable = () => {
  const gridRef = useRef();

  const { occasion, deselect } = useContext(TableContext);
  const [selectedOccasion, setSelectedOccasion] = occasion;
  const [deselectAll, setDeselectAll] = deselect;
  const [event, setEvent] = useState({});
  const [rowData, setRowData] = useState([]);
  const { data, error } = useFetch("/api/courseoccasion");

  const [columnDefs] = useState([
    { field: "courseorganizer", headerName: "Kursanordnare", width: 126 },
    { field: "name", headerName: "Kursnamn", width: 120 },
    { field: "startdate", headerName: "Startdatum", width: 120 },
    { field: "enddate", headerName: "Slutdatum", width: 120 },
  ]);

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      sortingOrder: ["asc", "desc", "null"],
    }),
    []
  );

  useEffect(() => {
    setRowData(data);
  }, [data]);

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
      <div className="table-container">
        <h2>Kurstillfälle</h2>
        <div
          className="ag-theme-alpine"
          style={{ height: 210, width: 488, fontFamily: "Raleway" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection={rowSelectionType}
            onSelectionChanged={onSelectionChanged}
            suppressCellFocus={true}
            rowMultiSelectWithClick={true}
            overlayNoRowsTemplate={"Inga kurstillfälle funna"}
          ></AgGridReact>
        </div>
      </div>
    </>
  );
};

export default CourseOccasionTable;
