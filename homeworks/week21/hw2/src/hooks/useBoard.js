import { useState } from 'react';

export default function useBoard() {
  const initialPlayer = 'black';
  const initialBoard = Array(19).fill(Array(19).fill('empty'));

  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setPlayer] = useState(initialPlayer);
  const [winner, setWinner] = useState();

  const countTotal = (newBoard, currentX, currentY, directionX, directionY) => {
    const now = newBoard[currentX][currentY];
    let tempX = currentX;
    let tempY = currentY;
    let total = 0;
  
    while (total < 5) {
      tempX += directionX;
      tempY += directionY;
  
      if (tempX < 0 || tempX > 18 || tempY < 0 || tempY > 18) {
        break;
      }
  
      if (newBoard[tempX][tempY] === now) {
        total++;
      } else {
        break;
      }
    }
    return total;
  };
  
  const checkWinner = (newBoard, x, y) => {
    if (
      countTotal(newBoard, x, y, 1, 0) + countTotal(newBoard, x, y, -1, 0) >= 4 ||
      countTotal(newBoard, x, y, 0, 1) + countTotal(newBoard, x, y, 0, -1) >= 4 ||
      countTotal(newBoard, x, y, 1, 1) + countTotal(newBoard, x, y, -1, -1) >=  4 ||
      countTotal(newBoard, x, y, 1, -1) + countTotal(newBoard, x, y, -1, 1) >= 4
    ) {
      setWinner(newBoard[x][y]);
    }
  };
  
  const handlePlayClick = (x, y, currentPlayer) => () => {
    const newBoard = JSON.parse(JSON.stringify(board));
  
    if (board[x][y] === 'empty' && !winner) {
      newBoard[x][y] = currentPlayer;
    } else {
      return;
    }
  
    setBoard(newBoard);
    setPlayer(currentPlayer === 'black' ? 'white' : 'black');
    checkWinner(newBoard, x, y);
  };
  
  const handleRestartButtonClick = () => {
    setPlayer(initialPlayer);
    setBoard(initialBoard);
    setWinner();
  };

  return {
    board,
    winner,
    currentPlayer,
    handlePlayClick,
    handleRestartButtonClick
  }
}