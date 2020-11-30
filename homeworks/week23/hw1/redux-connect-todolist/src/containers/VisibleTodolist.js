import { connect } from 'react-redux';
import VisibleTodolist from '../components/VisibleTodolist';
import { deleteTodoState, toggleTodoState, getTodosState } from '../redux/actions';

const mapStateToProps = (state) => state;
const mapDispatchToProps = { deleteTodoState, toggleTodoState, getTodosState };

export default connect(mapStateToProps, mapDispatchToProps)(VisibleTodolist);
