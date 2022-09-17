import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import DeleteModal from "./components/DeleteModal";
import ErrorModal from "./components/ErrorModal";
import Modal from "./components/Modal";
import Todo from "./components/Todo";
const API_URL = "http://localhost:8081/todo-v1";
const CATEGORY = ["Created", "In Progress", "Completed"];
function App() {
  const [todos, setTodos] = useState([]);
  const [dropActive, setDropActive] = useState(-1);
  const [deleteTodoId, setDeleteTodoId] = useState();
  const [modalActive, setModalActive] = useState(false);
  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null)
  const [errorModal, setErrorModal] = useState({active: false, message: ""})

  const getTodos = async () => {
    try{
    const res = await axios.get(API_URL);
    setTodos(res.data);
    }catch(err){
      const {response } = err;
      console.log(err)
      setErrorModal({
        message: response.data.message,
        active: true
      })
      setTodos([])
    }
  };
  useEffect(() => {
    getTodos();
  }, []);

  const updateTodo = async (updatedTodo) =>{
    try{
    const res = await axios.put(API_URL, updatedTodo);
    setTodos(res.data.todos);
    setModalActive(false)
  }catch(err){
    const {response } = err;
    console.log(err)
    setErrorModal({
      message: response.data.message,
      active: true
    })
  }
  }
  const addTodo = async (newTodo) =>{
    try{
    const res = await axios.post(API_URL, newTodo);
    setTodos(res.data.todos);
    setModalActive(false)
  }catch(err){
    const {response } = err;
    console.log(err)
    setErrorModal({
      message: response.data.message,
      active: true
    })
  }
  }
  const deleteTodo = async (id) =>{
    try{
    console.log(id)
    const res = await axios.patch(API_URL, {id});
    setTodos(res.data.todos);
    setModalActive(false)
    }catch(err){
      const {response } = err;
      console.log(err)
      setErrorModal({
        message: response.data.message,
        active: true
      })
    }
  }
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
                const res = await axios.put(API_URL, draggedTodo);

                setTodos(res.data.todos);
              }
              setDropActive(-1);
            }}
          >
            <h4>{category}</h4>
            {idx === 0 && 
            <button onClick={() => {
              if (!modalActive ){
                setCurrentTodo(null)
              setModalActive(true)}
            }} className="btn">Add Todo</button>}
            {todos
              .filter((t) => t.status === category)
              .map((todo) => (
                <Todo handleEditButtonClick={(editTodo) => {
                  setCurrentTodo({...editTodo})
                  setModalActive(true)
                }} 
                handleDeleteButtonClick={()=>{
                  setDeleteTodoId(todo.id)
                  setDeleteModalActive(true)
                  
                }}
                key={todo.id} todo={todo} updateTodo={updateTodo}/>
              ))}
          </div>
        );
      })}
      <Modal todo={currentTodo} updateTodo={updateTodo} addTodo={addTodo} active={modalActive} setModalActive={setModalActive}/>
      <ErrorModal message={errorModal.message} active={errorModal.active} setModalActive={
        (active) => setErrorModal(prev => ({...prev, active}))}/>
        <DeleteModal active={deleteModalActive} setModalActive={setDeleteModalActive} 
        handleDeleteTodo={()=>{
          deleteTodo(deleteTodoId)
          setDeleteModalActive(false)
        }}/>
    </div>
  );
}

export default App;
