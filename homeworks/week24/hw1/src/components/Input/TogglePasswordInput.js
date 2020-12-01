import styled from 'styled-components';
import PropTypes from 'prop-types';

const TogglePasswordWrapper = styled.div`
  margin-top: 20px;
`;

const TogglePasswordLabel = styled.label`
  margin-left: 10px;
`;

export default function Input({ togglePassword }) {
  return (
    <TogglePasswordWrapper>
      <input type="checkbox" onClick={togglePassword} id="password" />
      <TogglePasswordLabel htmlFor="password">顯示密碼 </TogglePasswordLabel>
    </TogglePasswordWrapper>
  );
}

Input.propTypes = {
  togglePassword: PropTypes.func.isRequired,
};
