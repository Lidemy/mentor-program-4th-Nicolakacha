import React, { Component } from 'react';
import TodoItem from './TodoItem';
import { ALL, COMPLETED, UNCOMPLETED } from '../constants/filterTypes';

class VisibleTodolist extends Component {
  componentDidUpdate = () => {
    window.localStorage.setItem(
      'todos',
      JSON.stringify(this.props.todoState.todos)
    );
  };

  componentDidMount = () => {
    this.props.getTodosState();
  };

  render() {
    const {
      todoState,
      filterState,
      toggleTodoState,
      deleteTodoState,
    } = this.props;

    const showedTodos = todoState.todos.filter((todo) => {
      switch (filterState) {
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

    return showedTodos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        toggleTodoState={toggleTodoState}
        deleteTodoState={deleteTodoState}
      />
    ));
  }
}

export default VisibleTodolist;
