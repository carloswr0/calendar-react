import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreator';

// Components
import Calendar from '../Calendar/Calendar';

export function mapStateToProps(state) {
  return {
    reminders: state.reminders,
    weather: state.weather,
  };
}

export function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispachToProps)(Calendar);

export default App;