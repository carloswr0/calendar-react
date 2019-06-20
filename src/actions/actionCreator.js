export const ADD_REMINDER = 'ADD_REMINDER';
export const EDIT_REMINDER = 'EDIT_REMINDER';
export const DELETE_REMINDER = 'DELETE_REMINDER';
export const DELETE_ALL_REMINDER = 'DELETE_ALL_REMINDER';
export const DELETE_ALL_DAY_REMINDER = 'DELETE_ALL_DAY_REMINDER';

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

export function editReminder(date, reminder, time, city, color) {
  return {
    type: EDIT_REMINDER,
    date,
    reminder,
    time,
    city,
    color,
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