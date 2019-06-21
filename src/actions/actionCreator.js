export const ADD_REMINDER = 'ADD_REMINDER';
export const EDIT_REMINDER = 'EDIT_REMINDER';
export const DELETE_REMINDER = 'DELETE_REMINDER';
export const DELETE_ALL_REMINDER = 'DELETE_ALL_REMINDER';
export const DELETE_ALL_DAY_REMINDER = 'DELETE_ALL_DAY_REMINDER';
export const WEATHER_UPDATE = 'WEATHER_UPDATE';
const apikey = 'e0c2824d90f62bfb2ceee12276d84277';

export function addReminder(date, reminder, time, city, color) {
  return {
    type: ADD_REMINDER,
    date,
    reminder,
    time,
    city,
    color,
  }
}

export function editReminder(date, reminder, time, city, color, index) {
  return {
    type: EDIT_REMINDER,
    date,
    reminder,
    time,
    city,
    color,
    index,
  }
}

export function deleteReminder(date, reminderIndex) {
  return {
    type: DELETE_REMINDER,
    date,
    reminderIndex,
  }
}

export function deleteAllReminders() {
  return {
    type: DELETE_ALL_REMINDER,
  }
}

export function deleteAllDayReminders(date) {
  return {
    type: DELETE_ALL_DAY_REMINDER,
    date,
  }
}

export const getWeather = (city, date) => {
  return (dispatch) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
    .then(response => response.json())
    .then(weather => {
      dispatch({
        type: WEATHER_UPDATE,
        payload: {weather, date},
      })
    })
    .catch(error => dispatch({ type: 'WEATHER_UPDATE_ERROR', error: error.message }))
  }
}
