import { combineReducers } from 'redux';
import reminders from './reminders';
import weather from './weather';

const rootReducer = combineReducers({reminders, weather});

export default rootReducer;