import { ADD_REMINDER } from '../actions/actionCreator';
import { EDIT_REMINDER } from '../actions/actionCreator';
import { DELETE_REMINDER } from '../actions/actionCreator';
import { DELETE_ALL_REMINDER } from '../actions/actionCreator';
import { DELETE_ALL_DAY_REMINDER } from '../actions/actionCreator';

import { compareTime } from '../shared/functions';
var _ = require('lodash');

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
      const remindersOfThisDay = [];
      const remindersOfOtherDays = [];
      state.map(reminder => {
        if(_.isEqual(reminder.date, action.date)) {
          remindersOfThisDay.push(reminder);
        } else {
          remindersOfOtherDays.push(reminder);
        };
        return 0; 
      });
      remindersOfThisDay.sort(compareTime).splice(action.reminderIndex, 1); 
      return [...remindersOfThisDay, ...remindersOfOtherDays];

    case DELETE_ALL_DAY_REMINDER:
      const filteredState = [];
      state.map(reminder => {
        if(!_.isEqual(reminder.date, action.date)){
          filteredState.push(reminder);
        };
        return 0;
      });
      return filteredState;

    case DELETE_ALL_REMINDER:
      return [];
    
    default:
      return state;   
  }
}

export default reminders;