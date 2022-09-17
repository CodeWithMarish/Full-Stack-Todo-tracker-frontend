import React from "react";
import ModalPortal from "./ModalPortal";

const DeleteModal = ({
  active,
  setModalActive,
  handleDeleteTodo
}) => {
  return (
    <div className={`modal ${active ? "active" : ""}`}>
      <h4>{"Delete"}</h4>
      <p>{"Are you sure you want to delete?"}</p>
      <div className="modal__buttons">
          <button onClick={()=>handleDeleteTodo()}>{"Delete"}</button>
          <button onClick={() => setModalActive(false)}>
            Cancel
          </button>
        </div>
    </div>
  );
};

export default ModalPortal(DeleteModal);
