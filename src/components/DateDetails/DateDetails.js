import React from 'react';
import { months } from '../../shared/data';
import { compareTime } from '../../shared/functions';
import Reminder from './Reminder/Reminder';
import './DateDetails.scss';
var _ = require('lodash');

const DateDetails = props =>  { 
  function handleToggleEditMode(reminder, date, index) {
    props.toggleEditMode(reminder, date, index);
  }
  const { date, toggleDateDetails } = props;
  const todaysDate = {
    date: date.date,
    month: date.month,
    year: date.year,
  };
  let remindersToRender = [];
  if (props) {
    props.reminders.forEach(e => {
      if(_.isEqual(e.date, todaysDate)) {
        remindersToRender.push(e);
      }
    })
  }
  return (
    <div className="date-details">
      <div className="header">
        <span>{months[date.month]} {date.date}, {date.year}</span>
        <span onClick={() => toggleDateDetails()}>Close</span>
      </div>
      <div className="content">
      {
        remindersToRender.sort(compareTime).map((reminder, i) => {
        return (
          <Reminder key={i}
            reminder={reminder}
            handleToggleEditMode={handleToggleEditMode}
            todaysDate={todaysDate}
            date={date}
            index={i}
            {...props}
          />
        );
      })
      }
      {
        remindersToRender.length < 1 ? <div>No reminders for today :)</div> : null
      }
      </div>
      {
        remindersToRender.length > 0 ?
        <div className="footer">
          <span onClick={() => props.deleteAllDayReminders(todaysDate)}>Clear day</span>
        </div> : null
      } 
    </div> 
  );
}

export default DateDetails;