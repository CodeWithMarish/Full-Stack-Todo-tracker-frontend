import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, getTodo, updateTodo } from "./todosSlice";

const Todos = () => {
  const todos = useSelector((state) => {
    console.log("state ", state);
    return state.todos;
  });
  const dispatch = useDispatch();
  console.log(todos);

  useEffect(() => {
    dispatch(getTodo());
  }, []);
  return (
    <>
      <div>Todos</div>
      <button onClick={() => dispatch(addTodo())}>Add</button>
      <button onClick={() => dispatch(updateTodo())}>Update</button>
      <button onClick={() => dispatch(deleteTodo())}>Delete</button>
    </>
  );
};

export default Todos;
