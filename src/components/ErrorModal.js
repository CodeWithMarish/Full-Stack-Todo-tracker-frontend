import React from "react";
import ModalPortal from "./ModalPortal";
const ErrorModal = ({ message, active, setModalActive }) => {
  return (
    <div className={`modal error ${active ? "active" : ""}`}>
      <h4>Error</h4>
      <p>{message}</p>
      <div className="modal__buttons">
        <button onClick={() => setModalActive(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ModalPortal(ErrorModal);
