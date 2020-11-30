import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputWrapper = styled.div`
  margin: 20px 0;
`;

const Input = styled.input`
  border: none;
  outline: none;
  padding: 5px 10px;
  border-bottom: 1px solid #909090;
  background: transparent;
  letter-spacing: 5px;
  color: #808080;
  font-size: 16px;
`;

export default function InputBox({
  type,
  value,
  title,
  handleInputFocus,
  handleInputChange,
}) {
  return (
    <InputWrapper>
      {title}
      <Input
        type={type}
        value={value}
        onFocus={handleInputFocus}
        onChange={handleInputChange}
      />
    </InputWrapper>
  );
}

InputBox.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleInputFocus: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};
