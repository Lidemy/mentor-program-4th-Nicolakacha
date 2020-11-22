import styled from 'styled-components';

const IntroductionWrapper = styled.div`
  text-align: center;
  margin-top: 10px;
  color: white;
`;

const Title = styled.h1`
  font-size: 18px;
  margin: 5px 0;
`;

const RestartButton = styled.button`
  background: pink;
  padding: 5px 15px;
  border-radius: 10px;
  border: transparent;
  outline: none;
  cursor: pointer;
  box-shadow: 0px 4px #888888;
  color: #333;
  &:active {
    transform: translateY(2px);
    box-shadow: 0px 0px #888888;
  }
`;

export default function introduction({ winner, handleRestartButtonClick }) {
  return (
    <IntroductionWrapper>
      <Title>{winner ? `${winner} wins` : 'React Gomoku Practice'}</Title>
      <RestartButton onClick={handleRestartButtonClick}>
        Play Again
      </RestartButton>
    </IntroductionWrapper>
  );
}
