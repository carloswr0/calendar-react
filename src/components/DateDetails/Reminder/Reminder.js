import React, { Component } from 'react';
var _ = require('lodash');

class Reminder extends Component { 
  constructor(props) {
    super(props);
  } 

  componentDidMount() {
    const shouldIRequest = this.props.weather.some((weather) => {
      return _.isEqual(weather.date, this.props.date) && weather.city === this.props.reminder.city;
    })
    if(!shouldIRequest) {
      this.props.getWeather(this.props.reminder.city, this.props.reminder.date);
    }
  }
  
  render() {
    const weatherForThisReminder = this.props.weather.find((weather) => {
      return _.isEqual(weather.date, this.props.date) && weather.city === this.props.reminder.city;
    });
    return (
      <div className="reminder-stripe" style={{backgroundColor: this.props.reminder.color}}>
        <div className="stripe">
          <span><b>{this.props.reminder.time}</b>{this.props.reminder.city ? <span>@{this.props.reminder.city}</span> : null}</span>
          <div className="actions">
            <span onClick={() => this.props.handleToggleEditMode(this.props.reminder, this.props.date, this.props.index)}>Edit</span>
            <span onClick={() => this.props.deleteReminder(this.props.todaysDate, this.props.index)}>Delete</span>
          </div>
        </div>
        <div className="stripe">
          <span>"{this.props.reminder.reminder}"</span>
        </div>
        <div className="stripe">
          {
            weatherForThisReminder ? 
            <span>
              {weatherForThisReminder.description[0].main}: {weatherForThisReminder.description[0].description} 
            </span> : <span>Loading weather...</span>}
        </div>
      </div>
    );
  }
}

export default Reminder;