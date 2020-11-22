/* eslint-disable array-callback-return */
import './App.css';
import styled from 'styled-components';
import TodoItem from './components/TodoItem';
import useTodo from './hooks/useTodo';

const Button = styled.button`
  margin-left: 10px;
`;

const DangerButton = styled(Button)`
  background: #255e69;
  color: whitesmoke;
`;

const NewTodoInput = styled.input`
  padding: 10px 10px;
  width: calc(100% - 20px);
  background-color: #6a959d;
  color: whitesmoke;
  font-size: 20px;
  vertical-align: middle;
`;

const Container = styled.div`
  margin: 40px auto;
  padding: 30px;
  max-width: 700px;
  background-color: #D1E2E5;
  font-family: 'Josefin Sans', sans-serif;
}
`;

function App() {
  const {
    todos,
    filter,
    value,
    handleChange,
    handleSubmit,
    deleteTodo,
    toggleIsDone,
    showAll,
    showCompleted,
    showUncompleted,
    clearAll,
  } = useTodo();

  return (
    <div className="App">
      <Container>
        <h1>React Todo List</h1>
        <div style={{ marginBottom: '30px' }}>
          <Button onClick={showAll}>全部</Button>
          <Button onClick={showCompleted}>已完成</Button>
          <Button onClick={showUncompleted}>未完成</Button>
          <DangerButton onClick={clearAll}>清空</DangerButton>
        </div>

        <NewTodoInput
          type="text"
          placeholder="Type something and press enter"
          value={value}
          onChange={handleChange}
          onKeyPress={handleSubmit}
        />

        {todos
          .filter((todo) => {
            if (filter === '') return todo;
            if (filter === 'completed') return todo.isDone === true;
            if (filter === 'uncompleted') return todo.isDone === false;
          })
          .map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              toggleIsDone={toggleIsDone}
            />
          ))}
      </Container>
    </div>
  );
}

export default App;
