import React, { useState, useEffect, useMemo } from "react";
import useFetch from "../../../hooks/useFetch";
import { useContext } from "react";
import { getUsers } from "../overview/overview.service";
import { TableContext } from "../../context/TableContext";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";

import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
const AccountTable = (props) => {
  const navigate = useNavigate();
  const { users, deselect } = useContext(TableContext);
  const [selectedUsers, setSelectedUsers] = users;
  const [deselectAll, setDeselectAll] = deselect;
  const [event, setEvent] = useState({});
  const { data, loading, error } = useFetch("/api/user");
  const [rowData, setRowData] = useState([]);

  const [columnDefs] = useState([
    { field: "firstname", headerName: "Förnamn", width: 100 },
    { field: "lastname", headerName: "Efternamn", width: 100 },
    { field: "email", headerName: "Användarnamn", width: 300 },
  ]);

  useEffect(() => {
      setRowData(data);
  }, [data]);

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      sortingOrder: ["asc", "desc", "null"],
    }),
    []
  );

  const rowSelectionType = "multiple";
  useEffect(() => {
    const onSelectionChanged = (event) => {
      if (deselectAll) {
        event.api.deselectAll();
        setDeselectAll(false);
        setSelectedUsers([]);
      }
    };
    onSelectionChanged(event);
  }, [deselectAll]);

  const onSelectionChanged = (event) => {
    setSelectedUsers(event.api.getSelectedRows());
    setEvent(event);
  };
  const onCellDoubleClicked = (event) => {
    let id = event.data.id;
    navigate(`/admin/account/${id}`);
  };

  return (
    <>
      <div className="table-container">
        <h2>Konto</h2>
        <div
          className="ag-theme-alpine"
          style={{ height: 210, width: 385, fontFamily: "Raleway" }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection={rowSelectionType}
            // onRowSelected={onRowSelected}
            onSelectionChanged={onSelectionChanged}
            rowMultiSelectWithClick={true}
            onCellDoubleClicked={onCellDoubleClicked}
            suppressCellFocus={true}
            overlayNoRowsTemplate={"Inga konto funna"}
          ></AgGridReact>
        </div>
      </div>
    </>
  );
};

export default AccountTable;
