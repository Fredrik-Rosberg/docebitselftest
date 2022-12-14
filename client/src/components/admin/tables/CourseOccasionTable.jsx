import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import useFetch from "../../../hooks/useFetch";
import { deleteCourseOccasion } from "../overview/overview.service";
import { TableContext } from "../../context/TableContext";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import UpdatePasswordModal from "../../modal/UpdatedPassWordModal";

const CourseOccasionTable = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    async removeFromArray() {
      if (selectedOccasion) {
        let result = await deleteCourseOccasion(selectedOccasion);
        if (!result) {
          setOpenModal(true);
          gridRef.current.api.deselectAll();
        } else {
          const selectedData = gridRef.current.api.getSelectedRows();
          gridRef.current.api.applyTransaction({ remove: selectedData });
        }
      }
    },
  }));

  const gridRef = useRef();
  const [openModal, setOpenModal] = useState(false);

  const { occasion, deselect } = useContext(TableContext);
  const [selectedOccasion, setSelectedOccasion] = occasion;
  const [deselectAll, setDeselectAll] = deselect;
  const [event, setEvent] = useState({});
  const [rowData, setRowData] = useState([]);
  const { data, error } = useFetch("/api/courseoccasion");

  const [columnDefs] = useState([
    { field: "organizer", headerName: "Kursanordnare", width: 115 },
    { field: "name", headerName: "Kursnamn", width: 100 },
    { field: "startdate", headerName: "Startdatum", width: 90 },
    { field: "enddate", headerName: "Slutdatum", width: 90 },
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
        <h2>Kurstillf??lle</h2>
        <UpdatePasswordModal
          content="Ta bort fr??n kurs f??rst"
          onClose={() => setOpenModal(!openModal)}
          show={openModal}
        ></UpdatePasswordModal>
        <div
          className="ag-theme-alpine"
          style={{ height: 220, width: 396, fontFamily: "Raleway" }}
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
            overlayNoRowsTemplate={"Inga kurstillf??lle funna"}
          ></AgGridReact>
        </div>
      </div>
    </>
  );
});

export default CourseOccasionTable;
