import "./ModalComponent.css";
import React from "react";
import ReactDOM from "react-dom";

const ModalComponent = (props) => {
  if (!props.show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-topbody">{props.content}</div>
        <div className="modal-bottombody">
          <button onClick={props.signOut} className="modal-button">
            Ja
          </button>
          <button onClick={props.onClose} className="modal-button">
            Avbryt
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("root")
  );
};
export default ModalComponent;
