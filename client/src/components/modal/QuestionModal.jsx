import "./modal.css";
import React from "react";
import ReactDOM from "react-dom";

const ModalComponent = (props) => {
  if (!props.show) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal" onClick={props.onClose}>
      <div
        className="questionmodal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="questionmodal-topbody">{props.content}</div>
        <div className="questionmodal-bottombody">
          <div onClick={props.signOut} >
            Ja
          </div>
          <div onClick={props.onClose} >
            Nej
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("root")
  );
};
export default ModalComponent;
