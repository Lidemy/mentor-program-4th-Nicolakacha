import React, { Component } from 'react';
import styled from 'styled-components';

const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  margin-top: 20px;
  word-break: break-word;
  width: 95%;
  border-bottom: 0.5px solid ${(props) => props.theme.colors.primary_4};
  & + & {
    margin-top: 5px;
  }
  & button {
    opacity: 0;
  }
  &:hover button {
    opacity: 1;
  }
`;

const TodoContent = styled.div`
  color: ${(props) => props.theme.colors.primary_5};
  font-size: 22px;
  word-break: break-word;
  width: 68%;
  ${(props) => props.$isDone && `text-decoration: line-through;`}
`;

const TodoButtonWrapper = styled.div``;

const TodoButton = styled.button`
  margin: 5px 0 0 10px;
  transition: all 0.1s linear;
`;

const DangerButton = styled(TodoButton)`
  background: #255e69;
  color: whitesmoke;
`;

class TodoItem extends Component {
  toggleTodo = () => this.props.toggleTodoState(this.props.todo.id);
  deleteTodo = () => this.props.deleteTodoState(this.props.todo.id);;

  render() {
    const { todo } = this.props;
    return (
      <TodoItemWrapper data-id={todo.id}>
        <TodoContent $isDone={todo.isDone}>{todo.content}</TodoContent>
        <TodoButtonWrapper>
          <TodoButton onClick={this.toggleTodo}>
            {todo.isDone ? '未完成' : '已完成'}
          </TodoButton>
          <DangerButton onClick={this.deleteTodo}>刪除</DangerButton>
        </TodoButtonWrapper>
      </TodoItemWrapper>
    );
  }
}

export default TodoItem;
