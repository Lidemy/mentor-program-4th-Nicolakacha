import { createSlice } from '@reduxjs/toolkit';

const todoData = JSON.parse(window.localStorage.getItem('todos'));

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    filter: 'ALL',
  },
  reducers: {
    getTodosState(state, _) {
      state.todos = todoData && todoData[0] !== undefined ? todoData : [];
    },

    addTodoState(state, action) {
      state.todos = [
        {
          id: state.todos.length ? state.todos[0].id + 1 : 1,
          content: action.payload.content,
          isDone: false,
        },
        ...state.todos,
      ];
    },

    deleteTodoState(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    clearTodosState(state, _) {
      state.todos = [];
    },

    toggleTodoState(state, action) {
      state.todos = state.todos.map((todo) => {
        if (todo.id !== action.payload) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      });
    },

    setFilterState(state, action) {
      state.filter = action.payload;
    },
  },
});

export const selectTodos = (state) => state.todos.todos;
export const selectFilter = (state) => state.todos.filter;

export const {
  addTodoState,
  deleteTodoState,
  toggleTodoState,
  clearTodosState,
  setFilterState,
  getTodosState,
} = todoSlice.actions;

export default todoSlice.reducer;
