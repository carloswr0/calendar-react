import React, { Component } from 'react';
import './DateCell.scss';

//import { weekdays, months } from '../../shared/data';

class DateCell extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      reminders: []
    };
  } 

  componentDidMount() {
    
  }

  handleAddReminder(date, month, year) {
    //console.log(this)
    if(this.props.year && this.props.month) {
      this.props.toggleReminderModal(date, month, year);
    }
  }

  render() {
    let remindersToRender = [];
    const {styleModifier, date, year, month } = this.props;
    const todaysDate = {
      date,
      month,
      year,
    };
    


    return(
      <td className={`date ${styleModifier}`}>
        <span className="actions" onClick={() => this.handleAddReminder(date, month, year)}>
          Add
        </span>
        <span>
          {this.props.date}
        </span>
        <div>
          {remindersToRender.toString()}
        </div>
      </td>
    );
  }
}

export default DateCell;