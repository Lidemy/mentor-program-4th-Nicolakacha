import './App.css';
import styled from 'styled-components';
import TodoItem from './components/TodoItem';
import useTodo from './hooks/useTodo';

const Title = styled.h1``;

const Filter = styled.div``;

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
    inputValue,
    showedTodos,
    handleInputChange,
    addTodo,
    deleteTodo,
    toggleTodo,
    showAll,
    showCompleted,
    showUncompleted,
    clearAll,
  } = useTodo();

  return (
    <div className="App">
      <Container>
        <Title>Redux Hooks Todo List</Title>
        <Filter style={{ marginBottom: '30px' }}>
          <Button onClick={showAll}>全部</Button>
          <Button onClick={showCompleted}>已完成</Button>
          <Button onClick={showUncompleted}>未完成</Button>
          <DangerButton onClick={clearAll}>清空</DangerButton>
        </Filter>

        <NewTodoInput
          type="text"
          placeholder="Type something and press enter"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={addTodo}
        />

        {showedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
          />
        ))}
      </Container>
    </div>
  );
}

export default App;
