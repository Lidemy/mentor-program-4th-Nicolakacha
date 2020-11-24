import { combineReducers } from 'redux';
import todos from './todos';
import filters from './filters';

export default combineReducers({
  todoState: todos,
  filterState: filters,
});
