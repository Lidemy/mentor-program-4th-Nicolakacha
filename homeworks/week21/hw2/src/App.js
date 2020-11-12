import './App.css';
import Introduction from './components/Introduction';
import Board from './components/Board';
import useBoard from './hooks/useBoard';

function App() {
  const {
    board,
    winner,
    currentPlayer,
    handlePlayClick,
    handleRestartButtonClick,
  } = useBoard();

  return (
    <div className="App">
      <Introduction
        winner={winner}
        handleRestartButtonClick={handleRestartButtonClick}
      />

      <Board
        handlePlayClick={handlePlayClick}
        currentPlayer={currentPlayer}
        board={board}
      />
    </div>
  );
}

export default App;
