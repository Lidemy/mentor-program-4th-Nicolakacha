import './App.css';
import styled from 'styled-components';
import AddTodo from './containers/AddTodo';
import Filters from './containers/Filters';
import VisibleTodolist from './containers/VisibleTodolist';

const Title = styled.h1``;

const Container = styled.div`
  margin: 40px auto;
  padding: 30px;
  max-width: 700px;
  background-color: #D1E2E5;
  font-family: 'Josefin Sans', sans-serif;
}
`;

function App() {
  return (
    <div className="App">
      <Container>
        <Title>Redux Connect Todo List</Title>
        <Filters />
        <AddTodo />
        <VisibleTodolist />
      </Container>
    </div>
  );
}

export default App;
