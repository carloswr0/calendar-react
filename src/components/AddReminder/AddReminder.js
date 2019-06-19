import React, { Component } from 'react';
import './AddReminder.scss';
import { months } from '../../shared/data';

class AddReminder extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      city: '',
      color: '#ff69b4',
      time: '', 
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
    const { date, toggleReminderModal } = this.props;
    const { description, city, color, time} = this.state;
    event.preventDefault();
    this.props.addReminder(date, description, time, city, color);
    toggleReminderModal();
  }

  render() {
    const { date , toggleReminderModal} = this.props;
    return(
      <div className="add-reminder">
        <div className="header">
          <span>{months[date.month]} {date.date}, {date.year}</span>
          <span onClick={() => toggleReminderModal()}>Close</span>
        </div>
        <div className="content">
          <form>
            <label>Reminder</label>
            <input name="description" maxLength="30" type="text" onChange={(e) => this.handleInputChange(e)} value={this.state.description}></input>
            
            <label>Time</label>
            <input name="time" type="time" onChange={(e) => this.handleInputChange(e)} value={this.state.time}></input>
            
            <label>City:</label>
            <select name="city" value={this.state.city} onChange={(e) => this.handleInputChange(e)}>
              <option value={'Los Angeles'}>Los Angeles</option>
              <option value={'California'}>California</option>
            </select>

            <label>Color</label>
            <input name="color" type="color" value={this.state.color} onChange={(e) => this.handleInputChange(e)}></input>
            <button onClick={(e) => this.onSubmitReminder(e)}>Add Reminder</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddReminder;