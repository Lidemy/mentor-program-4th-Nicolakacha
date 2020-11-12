import styled from 'styled-components';

const Board = styled.div`
  margin: 10px auto 0;
  padding: 0px;
  width: 532px;
  height: 531px;
  background: #e6b77e;
`;

const BoardRow = styled.div`
  width: 100%;
  height: calc(532px / 19);
  background: transparent;
  display: flex;
`;

const BoardSquare = styled.div`
  width: 27px;
  height: 27px;
  margin-top: -1px;
  margin-right: -1px;
  border: 1px solid #333;
  &:hover {
    background: #e0ce8a;
  }
  position: relative;
`;

const Cell = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${(props) => props.color};
  box-sizing: border-box;
  position: absolute;
`;

const rows = Array.from({ length: 19 });
const columns = Array.from({ length: 19 });

export default function board({
  handlePlayClick,
  currentPlayer,
  board
}) {
  return (
    <Board>
        {rows.map((row, x) => (
          <BoardRow key={x}>
            {columns.map((square, y) => (
              <BoardSquare
                key={y}
                onClick={handlePlayClick(x, y, currentPlayer)}
              >
                {board[x][y] && <Cell color={board[x][y]} />}
              </BoardSquare>
            ))}
          </BoardRow>
        ))}
      </Board>
  )
}