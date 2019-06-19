import React, { Component } from 'react';
import './Calendar.scss';
import { weekdays, months } from '../../shared/data';
import DateCell from '../Date/DateCell';
import AddReminder from '../AddReminder/AddReminder';

class Calendar extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      currentDay: null,
      currentMonth: null,
      currentYear: null,
      daysInMonth: null,
      previousMonthDays: null,
      addReminderToggle: false,
      reminderArguments: null,
    };
    this.toggleReminderModal = this.toggleReminderModal.bind(this);
  } 

  componentWillMount() {
    const today = new Date();
    this.setState({
      currentDay: today.getDate(),
      currentMonth: today.getMonth(),
      currentYear: today.getFullYear(),
    });
  }

  componentDidMount() {
    this.setGetDaysInMonth();
  }

  toggleReminderModal(date, month, year) {
    if(date && month && year){
      this.setState((state) => ({
        addReminderToggle: !state.addReminderToggle,
        reminderArguments: !state.addReminderToggle ? {date, month, year} : null,
      }));
    } else {
      this.setState({
        addReminderToggle: false,
        reminderArguments: null,
      });
    }
  }

  setGetDaysInMonth() {
    this.setState((state) => ({
      daysInMonth: this.getDaysInMonth(state.currentMonth, state.currentYear),
      previousMonthDays: this.getDaysInMonth(state.currentMonth-1, state.currentYear), 
      //Dont need to check for years since JAN & DEC Always have the same number of days.
    }));
  }

  getDaysInMonth(month, year) { 
    return 32 - new Date(year, month, 32).getDate();
  }

  getFirstdayOfTheMonth(month, year) {
    return (new Date(year, month)).getDay();
  }

  nextMonth() {
    this.setState((state) => ({
      currentMonth: state.currentMonth > 10 ? 0 : state.currentMonth + 1,
      currentYear: state.currentMonth > 10 ? state.currentYear + 1 : state.currentYear,
    }));
    this.setGetDaysInMonth();
  }

  previousMonth() {
    this.setState((state) => ({
      currentMonth: state.currentMonth < 1 ? 11 : state.currentMonth - 1,
      currentYear: state.currentMonth < 1 ? state.currentYear - 1 : state.currentYear,
    }));
    this.setGetDaysInMonth();
  }

  createCalendar = () => {
    const firstDay = this.getFirstdayOfTheMonth(this.state.currentMonth, this.state.currentYear);

    // For activate date porpouses.
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    
    // For Previous and Next month days porpouse.
    let previousDays = (this.state.previousMonthDays - firstDay);
    let nextDays = 1;

    let calendar = [];
    // Outer for to create week table rows
    let date = 1;
    for (let i = 0; i < 6; i++) {
      let weekRow = [];
      //Inner for to create weekdays cells
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          previousDays++;
          weekRow.push(<DateCell key={`${i}-${j}`} 
            styleModifier="blurred-date"
            date={previousDays} 
          />);
        } else if (date > this.state.daysInMonth) {
          weekRow.push(<DateCell key={`${i}-${j}`} 
            styleModifier="blurred-date"
            date={nextDays} 
          />);
          nextDays++;
        } else {
          if (date === this.state.currentDay && month === this.state.currentMonth && year === this.state.currentYear) {
            weekRow.push(<DateCell key={`${i}-${j}`} 
              styleModifier="active-date" 
              date={date} 
              year={this.state.currentYear} 
              month={this.state.currentMonth} 
              toggleReminderModal={this.toggleReminderModal}
              {...this.props} 
            />);
          } else {
            weekRow.push(<DateCell key={`${i}-${j}`} 
              styleModifier="" date={date} 
              year={this.state.currentYear} 
              month={this.state.currentMonth} 
              toggleReminderModal={this.toggleReminderModal}
              {...this.props} 
            />);
          }
          date++;
        }
      }
      //Adding weekRows to calentar node array.
      calendar.push(<tr key={i} className="week-row">{weekRow}</tr>)
    }
    return calendar;
  }
  
  render() {
    return (
      <React.Fragment>
        <div className="calendar">
          <div className="month-label">{months[this.state.currentMonth]}, {this.state.currentYear}</div>
          <table className="calendar-table">
            <thead className="weekdays">
              <tr>
                {
                  weekdays.map((day, index)  => {
                    return <th key={index} className="weekday">{day}</th>
                  })
                }
              </tr>
            </thead>
            <tbody>
            {
              //Taking this render table to a separate function for better readability.
              this.createCalendar()
            }
            </tbody>
          </table>
          <div className="month-control">
              <div onClick={() => this.previousMonth()}>Previous</div>
              <div onClick={() => this.nextMonth()}>Next</div>
          </div>
        </div>
        {
          this.state.addReminderToggle ? 
          <AddReminder 
            date={this.state.reminderArguments} 
            toggleReminderModal={this.toggleReminderModal}
            {...this.props}
          /> : null
        }
      </React.Fragment>
    );
  }
}

export default Calendar;
