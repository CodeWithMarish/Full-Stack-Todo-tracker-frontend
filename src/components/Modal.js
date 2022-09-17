import React from "react";
import ModalPortal from "./ModalPortal";
const Modal = ({ active, setModalActive, addTodo, updateTodo, todo }) => {
    console.log(todo)
  return (
    <div className={`modal ${active ? "active" : ""}`}>
      <h4>New Todo</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const [inp, priority] = e.target;
          console.log(inp.value, priority.value, todo);
          if (!todo) {
            console.log("adding todo")
            addTodo({
              todo: inp.value,
              priority: priority.value,
            });
          } else{
            console.log("updating todo")
            updateTodo({
                ...todo,
              todo: inp.value,
              priority: priority.value,
            });
        }
        e.target.reset()
      
      }}
      >
        <div className="form__input">
          <label htmlFor="todoInput">Task Input</label>
          <input
            name="todoInput"
            type={"text"}
            defaultValue={todo?.todo || ""}
            placeholder="Build Todo App.."
          />
        </div>
        <div className="form__input">
          <label htmlFor="priority">Priority</label>
          <select name="priority">
            {
              ["low", "medium", "high"].map((d) => {
                return <option value={d} selected={todo?.priority === d}>{d.toUpperCase()}</option>
              })
            }
          </select>
        </div>
        <div className="modal__buttons">
          <button type="submit">{todo ? "Update" : "Save"}</button>
          <button type="reset" onClick={() => setModalActive(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalPortal(Modal);
