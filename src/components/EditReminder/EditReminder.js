import React, { Component } from 'react';
import { months, cities } from '../../shared/data';
import './EditReminder.scss';

class EditReminder extends Component { 
  constructor(props) {
    super(props);
    const { reminder, city, color, time } = this.props.editArguments.reminder;
    this.state = {
      description: reminder ? reminder : '',
      city:  city ? city : '',
      color:  color ? color : '#ff69b4',
      time:  time ? time : '', 
    };
  } 

  handleInputChange(event) {
    const target = event.target;
    let value;
    switch(target.type) {
      case 'text':
        const message = target.value.slice(0, 30);
        value = message;
      break

      default:
        value = target.value;
    }
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  onSubmitReminder(event) {
    const { date, index } = this.props.editArguments;
    const { toggleEditMode } = this.props;
    const { description, city, color, time, } =  this.state;
    event.preventDefault();
    this.props.editReminder(date, description, time, city, color, index);
    toggleEditMode();
  }

  render() {
    const { date } = this.props.editArguments;
    const { toggleEditMode } = this.props;
    return(
      <div className="edit-reminder">
        <div className="header">
          <span>{months[date.month]} {date.date}, {date.year}</span>
          <span onClick={() => toggleEditMode()}>Close</span>
        </div>
        <div className="content">
          <form>
            <label>Edit Reminder</label>
            <input name="description" maxLength="30" type="text" placeholder="Enter a reminder" onChange={(e) => this.handleInputChange(e)} value={this.state.description}></input>        
            <label>Time</label>
            <input name="time" type="time" onChange={(e) => this.handleInputChange(e)} value={this.state.time}></input>            
            <label>City:</label>
            <select name="city" value={this.state.city} onChange={(e) => this.handleInputChange(e)}>
              {
                this.state.city !== '' ? <option value={this.state.city}>{this.state.city}</option> :
                <div>Select a city</div>
              }
              {
                cities.map((city,i) => {
                  return <option key={i} value={city}>{city}</option>
                })
              }
            </select>
            <label>Color</label>
            <input name="color" type="color" value={this.state.color} onChange={(e) => this.handleInputChange(e)}></input>
            <button onClick={(e) => this.onSubmitReminder(e)}>Edit Reminder</button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditReminder;