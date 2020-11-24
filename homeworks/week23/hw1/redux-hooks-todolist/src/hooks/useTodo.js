import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodos, selectFilter } from '../redux/selectors';
import { ALL, COMPLETED, UNCOMPLETED } from '../constants/filterTypes';
import {
  addTodoState,
  deleteTodoState,
  toggleTodoState,
  clearTodosState,
  setFilterState,
  getTodosState,
} from '../redux/actions';

function writeTodosToLocalStorage(todos) {
  window.localStorage.setItem('todos', JSON.stringify(todos));
}

export default function useTodo() {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e) => setInputValue(e.target.value);
  const todos = useSelector(selectTodos);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  useEffect(() => writeTodosToLocalStorage(todos), [todos]);

  useEffect(() => dispatch(getTodosState()), [dispatch]);

  const addTodo = (e) => {
    if (inputValue.trim() !== '' && e.key === 'Enter') {
      dispatch(addTodoState(inputValue));
      setInputValue('');
    }
  };

  const deleteTodo = (id) => dispatch(deleteTodoState(id));

  const toggleTodo = (id) => dispatch(toggleTodoState(id));

  const showAll = () => dispatch(setFilterState(ALL));

  const showCompleted = () => dispatch(setFilterState(COMPLETED));

  const showUncompleted = () => dispatch(setFilterState(UNCOMPLETED));

  const clearAll = () => dispatch(clearTodosState());

  const showedTodos = todos.filter((todo) => {
    switch (filter) {
      case ALL:
        return todo;

      case COMPLETED:
        return todo.isDone === true;

      case UNCOMPLETED:
        return todo.isDone === false;

      default:
        return todo;
    }
  });

  return {
    inputValue,
    showedTodos,
    setInputValue,
    handleInputChange,
    addTodo,
    deleteTodo,
    toggleTodo,
    showAll,
    showCompleted,
    showUncompleted,
    clearAll,
  };
}
