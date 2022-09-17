import { createSlice, nanoid } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  err: ""
};

export const todoSlice = createSlice({
  name: "mytodos",
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action) {
        console.log("adding todo", action.payload);
        state.todos.push(action.payload);
      },
      prepare(todo) {
        console.log("callign prepare: ", todo)
        return {
          payload: {
            id: nanoid(),
            status: "Created",
            ...todo,
          },
        };
      },
    },
    updateTodo: (state, action) => {
      console.log(action.payload);
      const { id } = action.payload;
      let idx = -1;
      var updateTodo = state.todos.find((t, i) => {
        idx = i;
        return t.id === id;
      });
      // const otherTodos = state.todos.filter((t) => t.id !== id);
      updateTodo = {
        ...action.payload,
      };
      state.todos[idx] = updateTodo;
      console.log("updating todo");
    },

    deleteTodo: (state, action) => {
      const id = action.payload;
      state.todos = [...state.todos.filter((t) => t.id !== id)];
      console.log("deleting todo");
    },
  },
});

export const selectTodos = (state) => state.todos;
export const { addTodo, updateTodo, deleteTodo, getTodo } = todoSlice.actions;

export default todoSlice.reducer;
