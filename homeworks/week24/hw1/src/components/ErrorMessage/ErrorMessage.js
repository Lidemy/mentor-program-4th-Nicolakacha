import styled from 'styled-components';

const ErrorMessage = styled.div`
  color: red;
  margin: 10px 0;
  height: ${(props) => props.$height}px;
  display: ${(props) => (props.errorMessage ? '1' : 'hidden')};
`;

export default ErrorMessage