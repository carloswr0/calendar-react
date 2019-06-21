import React, { Component } from 'react';
import './Calendar.scss';
import { weekdays, months } from '../../shared/data';
import DateCell from '../DateCell/DateCell';
import AddReminder from '../AddReminder/AddReminder';
import EditReminder from '../EditReminder/EditReminder';
import DateDetails from '../DateDetails/DateDetails';

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
      showDateDetails: false,
      dateDetailsArguments: null,
      editMode: false,
      editArguments: null,
    };
    this.toggleReminderModal = this.toggleReminderModal.bind(this);
    this.toggleDateDetails = this.toggleDateDetails.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
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
    //TODO: Refactor to RE USE this function.
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

  toggleEditMode(reminder, date, index) {
    //TODO: Refactor to RE USE this function.
    if(reminder && this.state.editMode === false){
      this.setState((state) => ({
        editMode: !state.editMode,
        editArguments: !state.editMode ? {reminder, date, index} : null,
      }));
    } else {
      this.setState({
        editMode: false,
        editArguments: null,
      });
    }
  }
 
  toggleDateDetails(date, month, year) {
    //TODO: Refactor to RE USE this function.
    if(date && month && year){
      this.setState((state) => ({
        showDateDetails: !state.showDateDetails,
        dateDetailsArguments: !state.dateDetailsArguments ? {date, month, year} : null,
        editMode: false,
      }));
    } else {
      this.setState({
        showDateDetails: false,
        dateDetailsArguments: null,
        editMode: false,
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
    this.toggleReminderModal();
  }

  previousMonth() {
    this.setState((state) => ({
      currentMonth: state.currentMonth < 1 ? 11 : state.currentMonth - 1,
      currentYear: state.currentMonth < 1 ? state.currentYear - 1 : state.currentYear,
    }));
    this.setGetDaysInMonth();
    this.toggleReminderModal();
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

    const calendar = [];
    // Outer for to create week table rows
    let date = 1;
    for (let i = 0; i < 6; i++) {
      const weekRow = [];
      //Inner for to create weekdays cells
      for (let j = 0; j < 7; j++) {
        const toProp = {
          key: `${i}-${j}`, 
        };
        if (i === 0 && j < firstDay) {
          previousDays++;
          toProp.styleModifier = "blurred-date";
          toProp.day = previousDays;
        } else if (date > this.state.daysInMonth) {
          toProp.styleModifier = "blurred-date";
          toProp.day = nextDays;
          nextDays++;
        } else {
          if (date === this.state.currentDay && month === this.state.currentMonth && year === this.state.currentYear) {
            toProp.styleModifier = "active-date";
            toProp.day = date;
            toProp.year = this.state.currentYear;
            toProp.month = this.state.currentMonth;
            toProp.storeProps = this.props;
            toProp.toggleReminderModal = this.toggleReminderModal;
            toProp.toggleDateDetails = this.toggleDateDetails;
          } else {
            toProp.styleModifier = "";
            toProp.day = date;
            toProp.year = this.state.currentYear;
            toProp.month = this.state.currentMonth;
            toProp.storeProps = this.props;
            toProp.toggleReminderModal = this.toggleReminderModal;
            toProp.toggleDateDetails = this.toggleDateDetails;
          }
          date++;
        }
        const newCell = <DateCell {...toProp}></DateCell>
        weekRow.push(newCell);
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
              <div onClick={() => this.props.deleteAllReminders()} className="delete-all">Delete all reminders.</div>
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
        {
          this.state.showDateDetails ? 
          <DateDetails 
            date={this.state.dateDetailsArguments} 
            toggleDateDetails={this.toggleDateDetails}
            toggleEditMode={this.toggleEditMode}
            {...this.props}
          /> : null
        }
        {
          this.state.editMode ?
          <EditReminder
            editArguments={this.state.editArguments} 
            toggleEditMode={this.toggleEditMode}
            {...this.props}
          /> : null
        }
      </React.Fragment>
    );
  }
}

export default Calendar;
