import { connect } from 'react-redux';
import { addTodoState } from '../redux/actions';
import AddTodo from '../components/AddTodo'

const mapStateToProps = (state) => state;
const mapDispatchToProps = { addTodoState };

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
