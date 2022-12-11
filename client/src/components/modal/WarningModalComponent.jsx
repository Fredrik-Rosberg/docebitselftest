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
        <div className="questionmodal-topbody ">
          <div>{props.content}</div>
          <div>{props.content2}</div>
        </div>
        <div className="modal-bottombody">
          <button className="modal-button" onClick={props.onClose}>Ok</button>
        </div>
      </div>
    </div>,
    document.getElementById("root")
  );
};
export default ModalComponent;
