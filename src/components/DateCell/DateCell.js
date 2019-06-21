import React from 'react';
import './DateCell.scss';
import { compareTime } from '../../shared/functions';
var _ = require('lodash');

const DateCell = props => { 
  function handleAddReminder(day, month, year) {
    if(props.year && props.month) {
      props.toggleReminderModal(day, month, year);
    };
  }
  
  const { day, month, year, styleModifier } = props;
  const todaysDate = {
    date: day,
    month,
    year,
  };
  let remindersToRender = [];
  if (props.storeProps) {
    props.storeProps.reminders.forEach(e => {
      if(_.isEqual(e.date, todaysDate)) {
        remindersToRender.push(e);
      }
    })
  }
  return(
    <td className={`date ${styleModifier}`} onClick={() => {props.toggleDateDetails && props.toggleDateDetails(day, month, year)}}>
      <span className="actions" onClick={(e) => {e.stopPropagation(); handleAddReminder(day, month, year)}}>
        Add
      </span>
      <span>
        {props.day}
      </span>
      <div className="reminder-list">
        {remindersToRender.slice(0, 3).sort(compareTime).map((reminder, i) => {
          return <div key={i} style={{backgroundColor: reminder.color}}><b>{reminder.time}</b>{reminder.reminder}</div>
        })}
        {
          remindersToRender.length > 3 ? <div>+{remindersToRender.length-3} reminders</div> : null
        }
      </div>
    </td>
  );
}

export default DateCell;