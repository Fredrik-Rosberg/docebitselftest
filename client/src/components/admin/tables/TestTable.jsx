import React, { useState, useEffect, useMemo, useRef } from "react";
import useFetch from "../../../hooks/useFetch";
import { useContext } from "react";
import { getTests } from "../overview/overview.service";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { TableContext } from "../../context/TableContext";
import "./tables.css";

const TestTable = () => {
  // const [course, setCourse] = useContext(TableContext);
  const gridRef = useRef();

  const { tests, deselect } = useContext(TableContext);
  const [rowData, setRowData] = useState([]);
  const [selectedTests, setSelectedTests] = tests;
  const [deselectAll, setDeselectAll] = deselect;
  const [event, setEvent] = useState({});
  const { data, error } = useFetch("/api/test");
  const [columnDefs] = useState([
    { field: "testname", headerName: "Test", width: 100 },
    { field: "uploaddate", headerName: "Uppladdningsdatum", width: 300 },
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
        setSelectedTests({});
      }
    };
    onSelectionChanged(event);
  }, [deselectAll]);
  const onSelectionChanged = (event) => {
    setSelectedTests(event.api.getSelectedRows()[0]);
    setEvent(event);
  };

  return (
    <>
      <div className="table-container">
        <h2>Test</h2>
        <div
          className="ag-theme-alpine"
          style={{ height: 210, width: 250, fontFamily: "Raleway" }}
        >
          <AgGridReact
            // ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection={rowSelectionType}
            onSelectionChanged={onSelectionChanged}
            suppressCellFocus={true}
            rowMultiSelectWithClick={true}
            overlayNoRowsTemplate={"Inga test funna"}
          ></AgGridReact>
        </div>
      </div>
    </>
  );
};

export default TestTable;
