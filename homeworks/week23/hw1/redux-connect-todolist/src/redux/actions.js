import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  SET_FILTER,
  CLEAR_TODOS,
  GET_TODOS,
} from './actionTypes';

export function addTodoState(content) {
  return {
    type: ADD_TODO,
    payload: { content },
  };
}

export function deleteTodoState(id) {
  return {
    type: DELETE_TODO,
    payload: { id },
  };
}

export function toggleTodoState(id) {
  return {
    type: TOGGLE_TODO,
    payload: { id },
  };
}

export function clearTodosState() {
  return {
    type: CLEAR_TODOS,
  };
}

export function getTodosState() {
  return {
    type: GET_TODOS,
  };
}

export function setFilterState(filter) {
  return {
    type: SET_FILTER,
    payload: { filter },
  };
}
