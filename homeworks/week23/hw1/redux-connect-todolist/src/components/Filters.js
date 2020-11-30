import React, { Component } from 'react';
import styled from 'styled-components';
import { ALL, COMPLETED, UNCOMPLETED } from '../constants/filterTypes';

const Filter = styled.div``;

const Button = styled.button`
  margin-left: 10px;
`;

const DangerButton = styled(Button)`
  background: #255e69;
  color: whitesmoke;
`;

class Filters extends Component {
  showAll = () => this.props.setFilterState(ALL);
  showCompleted = () => this.props.setFilterState(COMPLETED);
  showUncompleted = () => this.props.setFilterState(UNCOMPLETED);
  clearAll = () => this.props.clearTodosState();

  render() {
    return (
      <Filter style={{ marginBottom: '30px' }}>
        <Button onClick={this.showAll}>全部</Button>
        <Button onClick={this.showCompleted}>已完成</Button>
        <Button onClick={this.showUncompleted}>未完成</Button>
        <DangerButton onClick={this.clearAll}>清空</DangerButton>
      </Filter>
    );
  }
}

export default Filters;
