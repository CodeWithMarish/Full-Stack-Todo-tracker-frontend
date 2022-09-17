import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import DeleteModal from "./components/DeleteModal";
import ErrorModal from "./components/ErrorModal";
import Modal from "./components/Modal";
import Todo from "./components/Todo";
import { addTodo, deleteTodo, selectTodos, updateTodo } from "./features/todosSlice";
const CATEGORY = ["Created", "In Progress", "Completed"];
function App() {
  const { todos } = useSelector(selectTodos);
  const [dropActive, setDropActive] = useState(-1);
  const [deleteTodoId, setDeleteTodoId] = useState();
  const [modalActive, setModalActive] = useState(false);
  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [errorModal, setErrorModal] = useState({ active: false, message: "" });
  const dispatch = useDispatch();

  const handleUpdateTodo = async (updatedTodo) => {
    try {
      dispatch(updateTodo(updatedTodo));
      setModalActive(false);
    } catch (err) {
      const { response } = err;
      console.log(err);
      setErrorModal({
        message: response.data.message,
        active: true,
      });
    }
  };
  const handleAddTodo = async (newTodo) => {
    try {
      const res = dispatch(addTodo(newTodo));
      setModalActive(false);
    } catch (err) {
      const { response } = err;
      console.log(err);
      setErrorModal({
        message: response.data.message,
        active: true,
      });
    }
  };
  const handleDeleteTodo = async (id) => {
    try {
      console.log(id);
      dispatch(deleteTodo(id))
      setModalActive(false);
    } catch (err) {
      const { response } = err;
      console.log(err);
      setErrorModal({
        message: response.data.message,
        active: true,
      });
    }
  };
  return (
    <div className="container main">
      {CATEGORY.map((category, idx) => {
        return (
          <div
            key={category.toLowerCase()}
            id={category}
            className={`todo-container ${category
              .toLowerCase()
              .replace(" ", "_")} ${dropActive === idx ? "drop-active" : ""}`}
            onDragEnter={(e) => {
              let categoryId = e.target.id;
              e.preventDefault();
              if (dropActive === -1 || dropActive !== categoryId) {
                setDropActive(CATEGORY.indexOf(categoryId));
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={async (e) => {
              console.log(JSON.parse(e.dataTransfer.getData("todo")));
              e.preventDefault();
              const todo = JSON.parse(e.dataTransfer.getData("todo"));
              console.log("Drop todo id", todo);
              var draggedTodo = todos.find((t) => t.id === todo.id);
              if (draggedTodo.status !== e.target.id) {
                draggedTodo = {
                  ...draggedTodo,
                  status: e.target.id,
                };

                dispatch(updateTodo(draggedTodo));
              }
              setDropActive(-1);
            }}
          >
            <h4>{category}</h4>
            {idx === 0 && (
              <button
                onClick={() => {
                  if (!modalActive) {
                    setCurrentTodo(null);
                    setModalActive(true);
                  }
                }}
                className="btn"
              >
                Add Todo
              </button>
            )}
            {todos
              .filter((t) => t.status === category)
              .map((todo) => (
                <Todo
                  handleEditButtonClick={(editTodo) => {
                    setCurrentTodo({ ...editTodo });
                    setModalActive(true);
                  }}
                  handleDeleteButtonClick={() => {
                    setDeleteTodoId(todo.id);
                    setDeleteModalActive(true);
                  }}
                  key={todo.id}
                  todo={todo}
                  updateTodo={handleUpdateTodo}
                />
              ))}
          </div>
        );
      })}
      <Modal
        todo={currentTodo}
        updateTodo={handleUpdateTodo}
        addTodo={handleAddTodo}
        active={modalActive}
        setModalActive={setModalActive}
      />
      <ErrorModal
        message={errorModal.message}
        active={errorModal.active}
        setModalActive={(active) =>
          setErrorModal((prev) => ({ ...prev, active }))
        }
      />
      <DeleteModal
        active={deleteModalActive}
        setModalActive={setDeleteModalActive}
        handleDeleteTodo={() => {
          handleDeleteTodo(deleteTodoId);
          setDeleteModalActive(false);
        }}
      />
    </div>
  );
}

export default App;
