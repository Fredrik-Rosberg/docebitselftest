import "./updatePasswordModal.css";
import React from "react";
import ReactDOM from "react-dom";

const UpdatePasswordModal = (props) => {
  if (!props.show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="update-modal" onClick={props.onClose}>
      <div className="update-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="update-modal-topbody">{props.content}</div>
        <div className="update-modal-bottombody">
          <button onClick={props.onClose} className="update-modal-button">
           Ok
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("root")
  );
};
export default UpdatePasswordModal;
