import { connect } from 'react-redux';
import { setFilterState, clearTodosState } from '../redux/actions';
import Filters from '../components/Filters';

const mapStateToProps = (state) => state;
const mapDispatchToProps = { setFilterState, clearTodosState };

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
