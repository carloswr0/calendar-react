import { ADD_REMINDER } from '../actions/actionCreator';
import { EDIT_REMINDER } from '../actions/actionCreator';
import { DELETE_REMINDER } from '../actions/actionCreator';
import { DELETE_ALL_REMINDER } from '../actions/actionCreator';

function reminders(state = [], action) {
  switch(action.type) {
    
    case ADD_REMINDER:
      const reminder = {
        reminder: action.reminder,
        date: action.date,
        time: action.time,
        city: action.city,
        color: action.color,
      };
      return [
        ...state, reminder
      ];

    case EDIT_REMINDER:
      console.log(EDIT_REMINDER);
      return state;

    case DELETE_REMINDER:
      console.log(DELETE_REMINDER);
      return state;

    case DELETE_ALL_REMINDER:
      return [];
    
    default:
      return state;   
  }
}

export default reminders;