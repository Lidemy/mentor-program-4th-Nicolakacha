import styled from 'styled-components';

const SubmitButton = styled.button`
  padding: 5px 10px;
  margin: 10px auto;
  border-radius: 10px;
  border: transparent;
  background: #909090;
  color: white;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0px 5px 2px #707070;
  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px 2px #888888;
  }
`;

export default SubmitButton;