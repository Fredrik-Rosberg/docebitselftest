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
import UpdatePasswordModal from "../../modal/UpdatedPassWordModal";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
const AccountTable = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    removeFromArray() {
      const selectedData = gridRef.current.api.getSelectedRows();
      if (selectedData.length > 0) {
        selectedData.map(async (obj) => {
          let result = await deleteAccount(obj);
          if (!result) {
            setOpenModal(true);
            gridRef.current.api.deselectAll();
          } else {
            const selectedData = gridRef.current.api.getSelectedRows();
            gridRef.current.api.applyTransaction({ remove: selectedData });
          }
        });
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
  const [openModal, setOpenModal] = useState(false);
  const [columnDefs] = useState([
    { field: "firstname", headerName: "Förnamn", width: 80 },
    { field: "lastname", headerName: "Efternamn", width: 90 },
    { field: "email", headerName: "Användarnamn", width: 155 },
  ]);

  useEffect(() => {
    setRowData(data);
  }, [data]);

  const defaultColDef = useMemo(
    () => ({
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
        <UpdatePasswordModal
          content="Ta bort från kurs först"
          onClose={() => setOpenModal(!openModal)}
          show={openModal}
        ></UpdatePasswordModal>
        <div
          className="ag-theme-alpine"
          style={{ height: 220, width: 328, fontFamily: "Raleway" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection={props.rowSelectionType}
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
