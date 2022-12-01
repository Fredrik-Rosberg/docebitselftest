import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
  useMemo,
  useRef,
} from "react";
import useFetch from "../../../hooks/useFetch";
import { useContext } from "react";
import { deleteAccount } from "../overview/overview.service";
import { TableContext } from "../../context/TableContext";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";

import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
const AccountTable = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    removeFromArray() {
      if (selectedUsers.length > 0) {
        selectedUsers.map(async (obj) => {
          let result = await deleteAccount(obj);
          if (!result) {
            setErrors((current) => [current, obj]);
            console.log(errors.length + "geg");
          }
        });
        if (errors.length <= 0) {
          const selectedData = gridRef.current.api.getSelectedRows();
          console.log(selectedData);
          gridRef.current.api.applyTransaction({ remove: selectedData });
        }
      }
    },
  }));
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const { users, deselect } = useContext(TableContext);
  const [selectedUsers, setSelectedUsers] = users;
  const [deselectAll, setDeselectAll] = deselect;
  const [event, setEvent] = useState({});
  const { data, loading, error } = useFetch("/api/user");
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef();
  const [columnDefs] = useState([
    { field: "firstname", headerName: "Förnamn", width: 100 },
    { field: "lastname", headerName: "Efternamn", width: 100 },
    { field: "email", headerName: "Användarnamn", width: 183 },
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
            ref={gridRef}
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
});

export default AccountTable;
