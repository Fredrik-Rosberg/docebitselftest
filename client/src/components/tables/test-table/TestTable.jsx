import React, { useState, useEffect, useMemo } from "react";
import { useContext } from "react";
import { getTests } from "../../admin/overview/overview.service";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { TableContext } from "../../context/TableContext";

const TestTable = () => {
  // const [course, setCourse] = useContext(TableContext);
  const { tests, deselect } = useContext(TableContext);
  const [rowData, setRowData] = useState([{ testname: "", uploaddate: "" }]);
  const [selectedTests, setSelectedTests] = tests;
  const [deselectAll, setDeselectAll] = deselect;
  const [event, setEvent] = useState({});

  const [columnDefs] = useState([
    { field: "testname", headerName: "Test", width: 110 },
    { field: "uploaddate", headerName: "Uppladdningsdatum", width: 120 },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  );
  const setDateFormatOnArray = (data) => {
    data.map((obj) => {
      obj.uploaddate = new Date(obj.uploaddate).toLocaleDateString("se-SE");
    });
    return data;
  };
  useEffect(() => {
    async function fetchTests() {
      let data = await getTests();
      data = setDateFormatOnArray(data);
      setRowData(data);
    }
    fetchTests();
  }, []);

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
      <div className="container">
        <h2>Test</h2>
        <div className="ag-theme-alpine" style={{ height: 210, width: 250 }}>
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

export default TestTable;
