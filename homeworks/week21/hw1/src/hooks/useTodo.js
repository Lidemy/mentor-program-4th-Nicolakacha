import { useState, useEffect, useRef } from 'react';
import useInput from './useInput';

function writeTodosToLocalStorage(todos) {
  window.localStorage.setItem('todos', JSON.stringify(todos));
}

export default function useTodo() {
  const id = useRef(1);
  const { value, setValue, handleChange } = useInput();
  const [filter, setFilter] = useState('');
  const [todos, setTodos] = useState(() => {
    let todoData = JSON.parse(window.localStorage.getItem('todos'));
    if (todoData && todoData[0] !== undefined) {
      id.current = todoData[0].id + 1;
      return todoData;
    }
    return [];
  });

  useEffect(() => {
    writeTodosToLocalStorage(todos);
  }, [todos]);

  const newTodo = {
    id: id.current,
    content: value,
    isDone: false,
  };

  const handleSubmit = (e) => {
    if (value.trim() !== '' && e.key === 'Enter') {
      setTodos([newTodo, ...todos]);
      setValue('');
      id.current++;
    }
  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleIsDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  const showAll = () => setFilter('');
  const showCompleted = () => setFilter('completed');
  const showUncompleted = () => setFilter('uncompleted');
  const clearAll = (id) => setTodos(todos.filter((todo) => todo.id === id));

  return {
    todos,
    filter,
    value,
    setValue,
    handleChange,
    handleSubmit,
    deleteTodo,
    toggleIsDone,
    showAll,
    showCompleted,
    showUncompleted,
    clearAll,
  };
}
