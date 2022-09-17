import React, { useState } from "react";

const Todo = ({ todo, updateTodo, handleEditButtonClick, handleDeleteButtonClick }) => {
  const [input, setInput] = useState(false);
  return (
    <div
      id={todo.id}
      className="todo"
      onDragStart={(e) => {
        // e.dataTransfer.setData("todoId", todo.id)
        e.dataTransfer.setData("todo", JSON.stringify(todo));
      }}
      draggable={true}
    >
      {input ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateTodo({ ...todo, todo: e.target[0].value });
            setInput(false);
          }}
        >
          <input type={"text"} defaultValue={todo.todo} />
        </form>
      ) : (
        <p className="todo__text">{todo.todo}</p>
      )}
      <p className={`priority__text ${todo.priority}`}>{todo.priority || "low"}</p>
      <div className="todo-btn-grp">
      <button className="btn" onClick={() => handleEditButtonClick(todo)}>Edit</button>
      <button className="btn" onClick={() => handleDeleteButtonClick()}>Delete</button>
      </div>
    </div>
  );
};

export default Todo;
