import React, { Component } from 'react';
import styled from 'styled-components';

const NewTodoInput = styled.input`
  padding: 10px 10px;
  width: calc(100% - 20px);
  background-color: #6a959d;
  color: whitesmoke;
  font-size: 20px;
  vertical-align: middle;
`;

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
  }

  updateInput = (e) => this.setState({ input: e.target.value });

  addTodo = (e) => {
    if (this.state.input.trim() !== '' && e.key === 'Enter') {
      this.props.addTodoState(this.state.input);
      this.setState({ input: '' });
    }
  };

  render() {
    return (
      <NewTodoInput
        type="text"
        value={this.state.input}
        placeholder="Type something and press enter"
        onChange={this.updateInput}
        onKeyPress={this.addTodo}
      />
    );
  }
}

export default AddTodo;
