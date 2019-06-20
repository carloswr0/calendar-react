import React, { Component } from 'react';
import { months } from '../../shared/data';
import './DateDetails.scss';
var _ = require('lodash');

class DateDetails extends Component { 
  constructor(props) {
    super(props);
    this.state = {
   
    };
  } 

 

  render() {
    const { date, toggleDateDetails } = this.props;
    const todaysDate = {
      date: date.date,
      month: date.month,
      year: date.year,
    };
    let remindersToRender = [];
    if (this.props) {
      this.props.reminders.forEach(e => {
        if(_.isEqual(e.date, todaysDate)) {
          remindersToRender.push(e);
        }
      })
    }
    
    return(
      <div className="date-details">
        <div className="header">
          <span>{months[date.month]} {date.date}, {date.year}</span>
          <span onClick={() => toggleDateDetails()}>Close</span>
        </div>
        <div className="content">
        {
          remindersToRender.map((reminder, i) => {
          return (
            <div className="reminder-stripe" key={i} style={{backgroundColor: reminder.color}}>
              <div className="stripe">
                <span><b>{reminder.time}</b>{reminder.reminder}</span>
                <div className="actions"><span>Edit</span><span>Delete</span></div>
              </div>
              <div className="stripe">
                <span>"{reminder.city}" - "Forecast goes here"</span>
              </div>
            </div>
          );
        })
        }
        {
          remindersToRender.length < 1 ? <div>No reminders for today :)</div> : null
        }
        </div>
        {
          remindersToRender.length > 0 ?
          <div className="header">
            <span>Clear day</span>
          </div> : null
        } 
      </div>
    );
  }
}

export default DateDetails;