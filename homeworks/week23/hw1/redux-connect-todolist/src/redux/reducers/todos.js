import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  CLEAR_TODOS,
  GET_TODOS,
} from '../actionTypes';

const initialState = { todos: [] };

const todoData = JSON.parse(window.localStorage.getItem('todos'));

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TODOS: {
      return {
        ...state,
        todos: todoData && todoData[0] !== undefined ? todoData : [],
      };
    }

    case ADD_TODO: {
      return {
        ...state,
        todos: [
          {
            id: state.todos.length ? state.todos[0].id + 1 : 1,
            content: action.payload.content,
            isDone: false,
          },
          ...state.todos,
        ],
      };
    }

    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    }

    case TOGGLE_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.id) return todo;
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }),
      };
    }

    case CLEAR_TODOS: {
      return {
        ...state,
        todos: [],
      };
    }

    default: {
      return state;
    }
  }
}
